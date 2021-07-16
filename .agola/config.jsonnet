//Adding stuff from Ercole. Test number 3
local appName = "papagaio-web";

local vue_runtime() = {
  type: 'pod',
  arch: 'amd64',
  containers: [
    { image: 'registry.sorintdev.it/node:15.10.0' },
  ],
};

local task_build_go() = 
  {
    name: "build vue",
    runtime: vue_runtime(),
    environment:
    {
      "USERNAME": {
        from_variable: "NEXUSUSERNAME"
      },
       "PASSWORD": {
        from_variable: "NEXUSPASSWORD"
      },
    },
    steps: 
      [
        { type: 'clone' },
        { type: 'restore_cache', keys: ['cache-node' + '-sum-{{ md5sum "package.json" }}', 'cache-node' + '-date-'], dest_dir: './node_modules' },
        { type: 'run', name: 'remove directory', command: 'rm -rf dist' },
        { type: 'run', name: 'npm install', command: 'npm install' },
        { type: 'run', name: 'npm build', command: 'npm run build' },
        { type: 'save_cache', key: 'cache-node' + '-sum-{{ md5sum "package.json" }}', contents: [{ source_dir: './node_modules' }] },
        { type: 'save_cache', key: 'cache-node' + '-date-{{ year }}-{{ month }}-{{ day }}', contents: [{ source_dir: './node_modules' }] },
        { type: 'save_to_workspace', contents: [{ source_dir: '.', dest_dir: '.', paths: ['**'] }] },
        { type: 'run',
          name: 'Create and deploy Nexus', 
          command: |||
            if [ ${AGOLA_GIT_TAG} ]; then
              export TARBALL=papagaio-web-${AGOLA_GIT_TAG}.tar.gz ;
            else
              export TARBALL=papagaio-web-latest.tar.gz ; fi

            cp papagaio-web dist/ && tar -zcvf ${TARBALL} dist
            curl -v -k -u $USERNAME:$PASSWORD --upload-file ${TARBALL} https://nexus.sorintdev.it/repository/binaries/it.sorintdev.papagaio/${TARBALL}
          |||,
        },
      ],
  };

local task_docker_build_push_private() = {
  name: 'docker build and push private',
  when: {
    branch: 'master',
    tag: '#.*#',
  },
  runtime:
  {
    containers: [
      { image: "gcr.io/kaniko-project/executor:debug"},
    ],
  },
  environment:
  {
    "PRIVATE_DOCKERAUTH": {
      from_variable: "dockerauth"
    },
    "APPNAME": appName,
  },
  shell: "/busybox/sh",
  working_dir: '/kaniko',
  steps: 
   [
    { type: "restore_workspace", name: "restore workspace", dest_dir: "/kaniko/papagaio-web" },
    {
      type: "run",
      name: "generate docker config", 
      command: |||
        cat << EOF > /kaniko/.docker/config.json
        {
          "auths": {
            "registry.sorintdev.it": { "auth": "$PRIVATE_DOCKERAUTH" }
          }
        }
        EOF
      |||,
    },
     {
      type: "run",
      name: "kanico executor",
      command: |||
        echo "branch" $AGOLA_GIT_BRANCH
        if [ $AGOLA_GIT_TAG ]; then
          /kaniko/executor --context=dir:///kaniko/papagaio-web --dockerfile Dockerfile --destination registry.sorintdev.it/$APPNAME:$AGOLA_GIT_TAG;
        else
          /kaniko/executor --context=dir:///kaniko/papagaio-web --dockerfile Dockerfile --destination registry.sorintdev.it/$APPNAME:latest ; fi
      |||,
    },
   ],
  depends: ["build vue"]
};

local task_docker_build_push_public() = {
  name: 'docker build and push public',
  when: {
    tag: '#.*#',
  },
  runtime:
  {
    containers: [
      { image: "gcr.io/kaniko-project/executor:debug"},
    ],
  },
  environment:
  {
    "APPNAME": appName,
    "PUBLIC_DOCKERAUTH": {
      from_variable: "TULLIO-DOCKERAUTH" //temporarily using Tullio's dockerhub account due to a problem in sorint's account
    },
  },
  shell: "/busybox/sh",
  working_dir: '/kaniko',
  steps: 
   [
    { type: "restore_workspace", name: "restore workspace", dest_dir: "/kaniko/papagaio-web" },
    {
      type: "run",
      name: "generate docker config", 
      command: |||
        cat << EOF > /kaniko/.docker/config.json
        {
          "auths": {
            "https://index.docker.io/v1/": { "auth": "$PUBLIC_DOCKERAUTH" }
          }
        }
        EOF
      |||,
    },
    { type: "run", name: "kanico executor", command: "/kaniko/executor --context=dir:///kaniko/papagaio-web --dockerfile Dockerfile --destination tulliobotti/$APPNAME:$AGOLA_GIT_TAG" },
   ],
  depends: ["build vue"]
};

local task_kubernetes_deploy(target) = 
  {
    name: "kubernetes deploy " + target,
    runtime:
    {
      containers: [
        { 
          image: "registry.sorintdev.it/bitnami/kubectl:1.19",
          volumes: [
            {
              path: "/mnt/data",
              tmpfs: {},
            },
          ],
        },
      ],
    },
    environment:
    {
      "KUBERNETESCONF": {
        from_variable: "SORINTDEVKUBERNETESCONF"
      },
    },
    working_dir: '/mnt/data',
    steps: 
    [
      { type: "restore_workspace", name: "restore workspace", dest_dir: "." },
      { type: 'run', name: 'create folder kubernetes', command: 'mkdir kubernetes' },
      { type: 'run', name: 'generate kubernetes config', command: 'echo $KUBERNETESCONF | base64 -d > kubernetes/kubernetes.conf' },
      { type: 'run', name: 'sed version stable', command: 'sed -i s/VERSION/$AGOLA_GIT_TAG/g k8s/stable/deployment.yml' },
      { type: 'run', name: 'sed version release', command: 'sed -i s/VERSION/$AGOLA_GIT_TAG/g k8s/release/deployment.yml' },
      { type: 'run', name: 'kubectl replace', command: 'kubectl replace --force --kubeconfig=kubernetes/kubernetes.conf -f k8s/' + target },
    ],
  };

{
  runs: [
    {
      name: 'papagaio web',
      docker_registries_auth:
      {
        'registry.sorintdev.it':
        {
          username:
          {
            from_variable: "NEXUSUSERNAME"
          },
          password:
          {
            from_variable: "NEXUSPASSWORD"
          }
        }
      },
      tasks: [
        task_build_go(),
        task_docker_build_push_private(),
        task_docker_build_push_public(),
        task_kubernetes_deploy('dev')+ {
          when: {
            branch: 'master',
          },
          depends: ["docker build and push private"],
        },
        task_kubernetes_deploy('stable')+ {
          when: {
            tag: '#.*#',
          },
          depends: ["docker build and push private", "docker build and push public"],
        },
        task_kubernetes_deploy('release')+ {
          when: {
            tag: '#.*#',
          },
          approval: true,
          depends: ["docker build and push private", "docker build and push public"],
        },
      ]
    },
  ],
}