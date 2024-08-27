import Input from "../../../components/common/Input";
import Tab from "../../../components/tab/Tab";
import TabList from "../../../components/tab/TabList";
import TabPanel from "../../../components/tab/TabPanel";
import TabPanels from "../../../components/tab/TabPanels";
import { usePreviewStore } from "../../../context";
import { TOptions } from "../../../components/visualizer/setting";
import CheckBox from "../../../components/visualizer/setting/CheckBox";
import { createStore } from "solid-js/store";
import TabContext from "../../../context/tab/tab-context";

const SortingSetting = () => {
  const { setData, previewStore } = usePreviewStore();
  const [store, setStore] = createStore({
    basic: {
      value: previewStore.data.map((item) => item.value).join(","),
      error: false,
    },
    advanced: {
      value: "5",
      error: false,
      options: {
        manyDuplicates: false,
        sortedAscending: false,
        sortedDescending: false,
      } as TOptions,
    },
  });

  const handleChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => {
    const value = event.target.value;
    setStore("basic", "value", value);
  };

  const handleSizeChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => {
    const value = event.target.value;
    setStore("advanced", "value", value);
  };

  const handleOptionsChanged = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
    type: keyof TOptions,
  ) => {
    const target = event.target;
    setStore("advanced", "options", type, target.checked);
  };

  const handleSubmitBasic = () => {
    setStore("basic", "error", false);
    const tempValue = store.basic.value;
    const tempData = tempValue
      .trim()
      .split(",")
      .map((item) => item.trim());
    const NaNData = tempData.filter(
      (item) => item === "" || item === null || isNaN(+item),
    );
    if (NaNData.length > 0) {
      setStore("basic", "error", true);
      return;
    }
    setData(tempData.map((item) => parseInt(item)));
  };

  const handleSubmitAdvanced = () => {
    setStore("advanced", "error", false);
    const size = +store.advanced.value;
    if (isNaN(size)) {
      setStore("advanced", "error", true);
      return;
    }
    let limit = Math.floor(
      store.advanced.options.manyDuplicates ? size / 2.5 : size,
    );

    const numArray = new Array();
    for (var i = 0; i < size; ++i) {
      numArray.push(generateRandomNumber(1, limit));
    }
    store.advanced.options.sortedAscending
      ? numArray.sort((a, b) => a - b)
      : store.advanced.options.sortedDescending
        ? numArray.sort((a, b) => b - a)
        : numArray;
    setData(numArray);
  };

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return (
    <TabContext>
      <TabList sx="justify-between">
        <div class="text-white">
          <Tab index={0} title="basic" />
        </div>
        <div class="text-white">
          <Tab index={1} title="advanced" />
        </div>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div class="py-2">
            <Input
              id="data-arr"
              error={store.basic.error}
              type="text"
              value={store.basic.value}
              placeholder="Please enter value"
              helperText="Enter comma saparated numeric values"
              handleChange={handleChange}
            />
          </div>
          <div class="text-white w-[100%] flex items-center justify-center mt-4">
            <button
              class="px-2 py-1 rounded-md mx-auto bg-slate-500"
              onclick={handleSubmitBasic}
            >
              Create
            </button>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="w-[100%] py-2">
            <div class="flex justify-between items-center">
              <label class="text-white" for="size-arr">
                Size
              </label>
              <div class="w-[30%]">
                <Input
                  id="size-arr"
                  error={store.advanced.error}
                  type="text"
                  value={store.advanced.value}
                  placeholder="Size"
                  handleChange={handleSizeChange}
                />
              </div>
            </div>
            <div class="text-white w-[100%] mt-4 flex flex-col gap-4">
              <div class="flex justify-between items-center">
                <CheckBox
                  label="Many Dublicates"
                  checked={store.advanced.options.manyDuplicates}
                  id="manyDuplicates"
                  onChange={handleOptionsChanged}
                />
              </div>
              <div class="flex justify-between items-center">
                <CheckBox
                  label="Sorted Ascending"
                  checked={store.advanced.options.sortedAscending}
                  id="sortedAscending"
                  onChange={handleOptionsChanged}
                  disabled={store.advanced.options.sortedDescending}
                />
              </div>
              <div class="flex justify-between items-center">
                <CheckBox
                  label="Sorted Descending"
                  checked={store.advanced.options.sortedDescending}
                  disabled={store.advanced.options.sortedAscending}
                  id="sortedDescending"
                  onChange={handleOptionsChanged}
                />
              </div>
            </div>
          </div>
          <div class="text-white w-[100%] flex items-center justify-center my-4">
            <button
              class="px-2 py-1 rounded-md mx-auto bg-slate-500"
              onclick={handleSubmitAdvanced}
            >
              Create
            </button>
          </div>
        </TabPanel>
      </TabPanels>
    </TabContext>
  );
};

export default SortingSetting;
