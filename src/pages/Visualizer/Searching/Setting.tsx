import { createStore, produce } from "solid-js/store";
import Input from "../../../components/common/Input";
import Tab from "../../../components/tab/Tab";
import TabList from "../../../components/tab/TabList";
import TabPanel from "../../../components/tab/TabPanel";
import TabPanels from "../../../components/tab/TabPanels";
import TabContext from "../../../context/tab/tab-context";
import { usePreviewStore } from "../../../context";
import { onMount } from "solid-js";
import { useParams } from "@solidjs/router";

const SearchingSetting = () => {
  const { setData, previewStore } = usePreviewStore();

  const { id } = useParams();

  const [store, setStore] = createStore({
    basic: {
      input: {
        value: "",
        error: false,
      },
      needle: {
        value: "",
        error: false,
      },
    },
    advanced: {
      min: {
        value: "",
        error: false,
      },
      max: {
        value: "",
        error: false,
      },
      size: {
        value: "",
        error: false,
      },
      needle: {
        value: "",
        error: false,
      },
    },
  });

  onMount(() => {
    setStore(
      produce((state) => {
        state.basic.input.value = previewStore.data
          .slice(1)
          .map((item) => item.value)
          .join(",");
        state.basic.needle.value = "15";
      }),
    );
  });

  const handleChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
    key: "input" | "needle",
  ) => {
    const value = event.target.value;
    setStore("basic", key, "value", value);
  };

  const handleAdvancedChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
    key: "size" | "needle" | "max" | "min",
  ) => {
    const value = event.target.value;
    setStore("advanced", key, "value", value);
  };

  const handleSubmitBasic = () => {
    setStore("basic", "input", "error", false);
    setStore("basic", "needle", "error", false);
    const tempValue = store.basic.input.value;
    const tempData = tempValue
      .trim()
      .split(",")
      .map((item) => item.trim());
    const NaNData = tempData.filter(
      (item) => item === "" || item === null || isNaN(+item),
    );
    const needle = +store.basic.needle.value;
    const numArray = tempData.map((item) => parseInt(item));
    if (NaNData.length > 0 || isNaN(needle) || !isArraySorted(numArray)) {
      NaNData.length > 0 && setStore("basic", "input", "error", true);
      isNaN(needle) && setStore("basic", "needle", "error", true);
      !isArraySorted(numArray) && setStore("basic", "input", "error", true);
      return;
    }

    setData([needle].concat(numArray));
  };

  const handleSubmitAdvance = () => {
    setStore(
      produce((state) => {
        state.advanced.needle.error = false;
        state.advanced.size.error = false;
      }),
    );
    const size = +store.advanced.size.value;
    const min = +store.advanced.min.value;
    const max = +store.advanced.max.value;
    const needle = +store.advanced.needle.value;

    if (isNaN(size) || isNaN(needle) || isNaN(min) || isNaN(max)) {
      isNaN(size) && setStore("advanced", "size", "error", true);
      isNaN(needle) && setStore("advanced", "needle", "error", true);
      isNaN(min) && setStore("advanced", "min", "error", true);
      isNaN(max) && setStore("advanced", "max", "error", true);
      return;
    }

    if (min >= max) {
      setStore("advanced", "min", "error", true);
      setStore("advanced", "max", "error", true);
      return;
    }

    const numArray = new Array();
    for (var i = 0; i < size; ++i) {
      numArray.push(generateRandomNumber(min, max));
    }
    const arr = id === "bineary" ? numArray.sort((a, b) => a - b) : numArray;
    setData([needle].concat(arr));
  };

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const isArraySorted = (arr: number[]) => {
    if (id !== "bineary") return true;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
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
              error={store.basic.input.error}
              type="text"
              value={store.basic.input.value}
              placeholder="Please enter value"
              helperText={`Enter comma saparated numeric values ${id === "bineary" ? "in ascending order" : ""}`}
              handleChange={(ev) => handleChange(ev, "input")}
            />
            <div class="flex items-center justify-between">
              <label for="needle-value">Value:</label>
              <div class="w-[30%]">
                <Input
                  id="needle-value"
                  error={store.basic.needle.error}
                  type="text"
                  value={store.basic.needle.value}
                  handleChange={(ev) => handleChange(ev, "needle")}
                />
              </div>
            </div>
            <div class="text-white w-[100%] flex items-center justify-center mt-4">
              <button
                class="px-2 py-1 rounded-md mx-auto bg-slate-500"
                onClick={handleSubmitBasic}
              >
                Create
              </button>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="py-2">
            <div class="flex items-center justify-between mb-2">
              <label for="min-value">Min Value:</label>
              <div class="w-[30%]">
                <Input
                  id="min-value"
                  value={store.advanced.min.value}
                  error={store.advanced.min.error}
                  type="text"
                  handleChange={(ev) => handleAdvancedChange(ev, "min")}
                />
              </div>
            </div>
            <div class="flex items-center justify-between mb-2">
              <label for="max-value">Max Value:</label>
              <div class="w-[30%]">
                <Input
                  id="max-value"
                  value={store.advanced.max.value}
                  error={store.advanced.max.error}
                  type="text"
                  handleChange={(ev) => handleAdvancedChange(ev, "max")}
                />
              </div>
            </div>
            <div class="flex items-center justify-between mb-2">
              <label for="arr-size">Array Size:</label>
              <div class="w-[30%]">
                <Input
                  id="arr-size"
                  value={store.advanced.size.value}
                  error={store.advanced.size.error}
                  type="text"
                  handleChange={(ev) => handleAdvancedChange(ev, "size")}
                />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <label for="search-value">Search Value:</label>
              <div class="w-[30%]">
                <Input
                  id="search-value"
                  value={store.advanced.needle.value}
                  error={store.advanced.needle.error}
                  type="text"
                  handleChange={(ev) => handleAdvancedChange(ev, "needle")}
                />
              </div>
            </div>
            <div class="text-white w-[100%] flex items-center justify-center mt-4">
              <button
                class="px-2 py-1 rounded-md mx-auto bg-slate-500"
                onClick={handleSubmitAdvance}
              >
                Create
              </button>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabContext>
  );
};

export default SearchingSetting;
