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
      note="The format that the shortened URL will be generated in. The default is OwOified (eg: owo.vc/owo_uwu), while ZWS returns what looks like the same URL (owo.vc/), but the route is done with invisible characters."
      value={getSetting("zws", false)}
      onChange={() => toggleSetting("zws")}
    >
      ZWS URL Format
    </SwitchItem>
    <SwitchItem
      note="Prevents owo.vc from sending the meta tags from the destination URL."
      value={getSetting("scrape", false)}
      onChange={() => toggleSetting("scrape")}
    >
      Prevent Metadata Scraping
    </SwitchItem>
    <SwitchItem
      note="OwOifies the metadata fetched from the URL."
      value={getSetting("owoify", false)}
      onChange={() => toggleSetting("owoify")}
    >
      OwOify
    </SwitchItem>
      </div>
    )

  }

}