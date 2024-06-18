import { createStore } from "solid-js/store";
import CreateIcon from "../../../assets/circle-plus-solid.svg";
import ClockIcon from "../../../assets/clock-solid.svg";
import { usePreviewStore } from "../../../context";
import TabContext from "../../../context/tab/tab-context";
import Input from "../../common/Input";
import Tab from "../../tab/Tab";
import TabList from "../../tab/TabList";
import TabPanel from "../../tab/TabPanel";
import TabPanels from "../../tab/TabPanels";

const Setting = () => {
  const { setData, previewStore } = usePreviewStore();
  const [store, setStore] = createStore({
    basic: {
      value: previewStore.data.map((item) => item.value).join(","),
      error: false,
    },
    advanced: {},
  });

  const handleChange = (
    event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }
  ) => {
    console.log("ksdfj");
    event.stopPropagation();
    const value = event.target.value;
    setStore("basic", "value", value);
  };

  const handleSubmitBasic = () => {
    setStore("basic", "error", false);
    const tempValue = store.basic.value;
    const tempData = tempValue
      .trim()
      .split(",")
      .map((item) => item.trim());
    const NaNData = tempData.filter(
      (item) => item === "" || item === null || isNaN(+item)
    );
    if (NaNData.length > 0) {
      setStore("basic", "error", true);
      return;
    }
    setData(tempData.map((item) => parseInt(item)));
  };

  return (
    <section class="text-white bg-bold-t rounded-md min-w-[250px] h-[250px]">
      <div class="overflow-x-hidden overflow-auto h-[100%]">
        <TabContext>
          <div class="bg-bold p-3 pb-0 rounded-t-md">
            <TabList sx="gap-8">
              <Tab index={0} icon={CreateIcon} />
              <Tab index={1} icon={ClockIcon} />
            </TabList>
          </div>
          <TabPanels>
            <TabPanel>
              <div class="p-2 pb-0">
                <TabContext>
                  <TabList sx="justify-between">
                    <Tab index={0} title="basic" />
                    <Tab index={1} title="advanced" />
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <div class="py-2">
                        <Input
                          error={store.basic.error}
                          type="text"
                          value={store.basic.value}
                          placeholder="Please enter value"
                          helperText="Enter comma saparated numeric values"
                          handleChange={handleChange}
                        />
                      </div>
                    </TabPanel>
                    <TabPanel>content sub 2</TabPanel>
                  </TabPanels>
                </TabContext>
                <div class="w-[100%] flex items-center justify-center mt-4">
                  <button
                    class="px-2 py-1 rounded-md mx-auto bg-slate-500"
                    onclick={handleSubmitBasic}
                  >
                    Create
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div class="p-4">content 2</div>
            </TabPanel>
          </TabPanels>
        </TabContext>
      </div>
    </section>
  );
};

export default Setting;
