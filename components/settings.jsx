const {React} = require("powercord/webpack");
const {TextInput, SwitchItem, FormItem} = require("powercord/components/settings");

module.exports = class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.plugin = powercord.pluginManager.get('owo-vc-pc');
    this.state = { opened: false };
  }

  render() {
    const {getSetting, updateSetting, toggleSetting} = this.props;

    return (
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

  }

}