<template>
  <div class="w-3/4 container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">Scan Interval</h4>
    <div class="bg-gray-100">
      <div class="p-4 border-t">
        <table style="width: 100%">
          <div class="float-right">
            <el-popover
              placement="top-start"
              title="Reconfigure Scan Interval"
              :width="300"
              trigger="hover"
              content="this is content, this is content, this is content"
            >
              <template #reference>
                <el-button>?</el-button>
              </template>
            </el-popover>
          </div>
          <h5 class="mb-3 text-xl">Reconfigure Scan Interval</h5>

          <tr>
            <!-- arrow of dropdown list  -->
            <div class="flex mb-3 relative">
              <select
                class="block appearance-none w-full mt-2 bg-white border focus:border-papaDark-700 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="null" disabled selected hidden display>
                  Select from list
                </option>
                <option>10</option>
                <option>10</option>
                <option>10</option>
                <option>10</option>
                <option>10</option>
                <option>10</option>
                <option>10</option>
                <option>10</option>
                <option>10</option>
              </select>

              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  ></path>
                </svg>
              </div>
            </div>
          </tr>
        </table>
      </div>
    </div>
    <div class="sm:mt-0 sm:ml-3">
      <button
        class="px-10 py-3 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold py-2 px-4 rounded float-right mt-5 border-solid border-2 border-white"
      >
        Set
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>