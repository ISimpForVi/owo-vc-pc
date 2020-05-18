const {React} = require("powercord/webpack");
const {TextInput, SwitchItem, FormItem} = require("powercord/components/settings");

module.exports = ({getSetting, updateSetting, toggleSetting}) => (
  <div>
    <SwitchItem
      note="zws generator"
      value={getSetting("zws", false)}
      onChange={() => toggleSetting("zws")}
    >
      zws generator
    </SwitchItem>
    <SwitchItem
      note="Prevent Scrape"
      value={getSetting("scrape", false)}
      onChange={() => toggleSetting("scrape")}
    >
      Prevent Scrape
    </SwitchItem>
    <SwitchItem
      note="owoify"
      value={getSetting("owoify", false)}
      onChange={() => toggleSetting("owoify")}
    >
      owoify
    </SwitchItem>
  </div>
)