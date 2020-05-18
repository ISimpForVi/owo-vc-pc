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
  inject
} = require('powercord/injector');
const {
  getOwnerInstance
} = require('powercord/util');
const {
  ContextMenu: {
    Button
  }
} = require("powercord/components");
const settings = require("./components/settings");

module.exports = class Upload extends Plugin {
  startPlugin() {
    this.registerSettings("owo-vc-pc", "owo.vc Shorten URL", settings);
    this._injectContextMenu();
  }

  async upload(url) {
    let generator = "owo"
    if (await this.settings.get("zws")) generator = "zws"
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (() => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let res = JSON.parse(xhr.response)
        clipboard.writeText("https://" + res.result, "selection")
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
    const {
      contextMenu
    } = await getModule(["contextMenu"]);
    const {
      imageWrapper
    } = await getModule(["imageWrapper"]);
    const callback = () =>
      setTimeout(async () => {
        const element = document.querySelector(`.${contextMenu}`);
        if (element) {
          const instance = getOwnerInstance(element);
          if (instance._reactInternalFiber.child.child.pendingProps.type === 'MESSAGE_MAIN') {
            window.removeEventListener('contextmenu', callback, true);
            const fn = instance._reactInternalFiber.child.child.type;
            const mdl = await getModule(m => m.default === fn);
            inject('owo-vc-pc', mdl, 'default', ([{
              target
            }], res) => {
              if (target.tagName.toLowerCase() === 'a') {
                res.props.children.push(
                  React.createElement(Button, {
                    name: 'Shorten URL with owo.vc',
                    separate: false,
                    onClick: () => this.upload(target.href)
                  })
                );
              }
              return res;
            });
            instance.forceUpdate();
          }
        }
      }, 5);
    window.addEventListener('contextmenu', callback, true);
  }
};