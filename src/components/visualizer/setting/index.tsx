import { createStore } from "solid-js/store";
import CreateIcon from "../../../assets/circle-plus-solid.svg";
import ClockIcon from "../../../assets/clock-solid.svg";
import { usePreviewStore } from "../../../context";
import TabContext from "../../../context/tab/tab-context";
import Tab from "../../tab/Tab";
import TabList from "../../tab/TabList";
import TabPanel from "../../tab/TabPanel";
import TabPanels from "../../tab/TabPanels";
import { For, ParentComponent, children } from "solid-js";

export type TOptions = {
  manyDuplicates: boolean;
  sortedAscending: boolean;
  sortedDescending: boolean;
};

const Setting: ParentComponent = (props) => {
  const { handleSpeedChange, previewStore } = usePreviewStore();

  const resolvedChildren = children(() => props.children);

  const animationSpeed = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section class="bg-bold-t rounded-md min-w-[250px] h-[250px] setting">
      <div class="overflow-x-hidden overflow-auto h-[100%]">
        <TabContext>
          <div class="text-white bg-bold p-3 pb-0 rounded-t-md">
            <TabList sx="gap-8">
              <Tab index={0} icon={CreateIcon} />
              <Tab index={1} icon={ClockIcon} />
            </TabList>
          </div>
          <TabPanels>
            <TabPanel>
              <div class="p-2 pb-0">{resolvedChildren()}</div>
            </TabPanel>
            <TabPanel>
              <div class="text-white p-4">
                <div class="w-[100%]">
                  <ul class="flex flex-col gap-3">
                    <For each={animationSpeed}>
                      {(item, _) => (
                        <li
                          class="p-2 hover:bg-slate-400 rounded-sm cursor-pointer"
                          classList={{
                            "bg-gray-700": item === previewStore.speed,
                          }}
                          onclick={() => handleSpeedChange(item)}
                        >
                          {item + "X"}
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabContext>
      </div>
    </section>
  );
};

export default Setting;
