const {
  Plugin
} = require("powercord/entities");
const {
  clipboard
} = require("electron");
const {
  getModule,
  React
} = require("powercord/webpack");
const {
  inject,
  uninject
} = require('powercord/injector');
const settings = require("./components/settings");

module.exports = class Upload extends Plugin {
  startPlugin() {
    this.registerSettings("owo-vc-pc", "Shorten URL with owo.vc", settings);
    this._injectContextMenu();
  }

  pluginWillUnload() {
    uninject("owo-vc-pc")
  }

  async upload(url) {
    let generator = "owo"
    if (await this.settings.get("zws")) generator = "zws"
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (() => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let res = JSON.parse(xhr.response)
        clipboard.writeText("https://" + res.result)
      }
    })
    xhr.open("POST", "https://owo.vc/generate")
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    let preventScrape = await this.settings.get("scrape")
    preventScrape ? preventScrape : false
    let owoify = await this.settings.get("owoify") || false
    owoify ? owoify : false
    xhr.send(JSON.stringify({
      "link": url,
      "generator": generator,
      "preventScrape": preventScrape,
      "owoify": owoify
    }))

  }

  async _injectContextMenu() {
    const menu = await getModule(["MenuItem"])
    const mdl = await getModule(m => m.default && m.default.displayName === 'MessageContextMenu');
    inject('owo-vc-pc', mdl, 'default', ([{
      target
    }], res) => {
      if (target.tagName.toLowerCase() === 'a') {
        res.props.children.splice(4, 0,
          React.createElement(menu.MenuItem, {
            name: "Shorten URL with owo.vc",
            separate: false,
            id: "owo-vc-pc",
            label: "Shorten URL with owo.vc",
            action: () => this.upload(target.href)
          })
        );
      }
      return res;
    });
    mdl.default.displayName = 'MessageContextMenu';
  }
};