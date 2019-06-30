import {React, Logger, Strings} from "modules";
import CloseButton from "../icons/close";
import ReloadIcon from "../icons/reload";
import Switch from "./components/switch";

export default class AddonCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settingsOpen: false
        };

        this.settingsPanel = "";
        this.panelRef = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.reload = this.reload.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.closeSettings = this.closeSettings.bind(this);
    }

    reload() {
        if (!this.props.reload) return;
        this.props.addon = this.props.reload(this.props.addon.id);
        this.forceUpdate();
    }

    componentDidUpdate() {
        if (!this.state.settingsOpen) return;
        if (this.settingsPanel instanceof Node) this.panelRef.current.appendChild(this.settingsPanel);

        // if (!SettingsCookie["fork-ps-3"]) return;
        const isHidden = (container, element) => {
            const cTop = container.scrollTop;
            const cBottom = cTop + container.clientHeight;
            const eTop = element.offsetTop;
            const eBottom = eTop + element.clientHeight;
            return  (eTop < cTop || eBottom > cBottom);
        };

        const panel = $(this.panelRef.current);
        const container = panel.parents(".scroller-2FKFPG");
        if (!isHidden(container[0], panel[0])) return;
        container.animate({
            scrollTop: panel.offset().top - container.offset().top + container.scrollTop() - 30
        }, 300);
    }

    getString(value) {return typeof value == "string" ? value : value.toString();}

    onChange() {
        this.props.onChange && this.props.onChange(this.props.addon.id);
        this.props.enabled = !this.props.enabled;
    }

    showSettings() {
        if (!this.props.hasSettings) return;
        this.setState({settingsOpen: true});
    }

    closeSettings() {
        this.panelRef.current.innerHTML = "";
        this.setState({settingsOpen: false});
    }

    buildTitle(name, version, author) {
        const title = Strings.Addons.title.split(/({{[A-Za-z]+}})/);
        const nameIndex = title.findIndex(s => s == "{{name}}");
        if (nameIndex) title[nameIndex] = React.createElement("span", {className: "bd-name"}, name);
        const versionIndex = title.findIndex(s => s == "{{version}}");
        if (nameIndex) title[versionIndex] = React.createElement("span", {className: "bd-version"}, version);
        const authorIndex = title.findIndex(s => s == "{{author}}");
        if (nameIndex) title[authorIndex] = React.createElement("span", {className: "bd-author"}, author);
        return title.flat();
    }

    get settingsComponent() {
        const addon = this.props.addon;
        const name = this.getString(addon.name);
        try { this.settingsPanel = this.props.getSettingsPanel(); }
        catch (err) { Logger.stacktrace("Addon Settings", "Unable to get settings panel for " + name + ".", err); }

        const props = {id: `${name}-settings`, className: "addon-settings", ref: this.panelRef};
        if (typeof(settingsPanel) == "string") props.dangerouslySetInnerHTML = this.settingsPanel;

        return <div className="bd-addon-card settings-open bd-switch-item">
                    <div className="bd-close" onClick={this.closeSettings}><CloseButton /></div>
                    <div {...props}>{this.settingsPanel instanceof React.Component ? this.settingsPanel : null}</div>
                </div>;
    }

    buildLink(which) {
        const url = this.props.addon[which];
        if (!url) return null;
        return <a className="bd-link bd-link-website" href={url} target="_blank" rel="noopener noreferrer">{Strings.Addons[which]}</a>;
    }

    get footer() {
        const links = ["website", "source"];
        if (!links.some(l => this.props.addon[l]) && !this.props.hasSettings) return null;
        const linkComponents = links.map(this.buildLink.bind(this)).filter(c => c);
        return <div className="bd-footer">
                    <span className="bd-links">{linkComponents.map((comp, i) => i < linkComponents.length - 1 ? [comp, " | "] : [comp]).flat()}</span>
                    {this.props.hasSettings && <button onClick={this.showSettings} className="bd-button bd-button-addon-settings" disabled={!this.props.enabled}>{Strings.Addons.addonSettings}</button>}
                </div>;
    }

    render() {
        if (this.state.settingsOpen) return this.settingsComponent;

        const addon = this.props.addon;
        const name = this.getString(addon.name);
        const author = this.getString(addon.author);
        const description = this.getString(addon.description);
        const version = this.getString(addon.version);

        return <div id={`${addon.id}-card`} className="bd-addon-card settings-closed">
                    <div className="bd-addon-header">
                            <span className="bd-title">{this.buildTitle(name, version, author)}</span>
                            <div className="bd-controls">
                                {this.props.showReloadIcon && <ReloadIcon className="bd-reload bd-reload-card" onClick={this.reload} />}
                                <Switch checked={this.props.enabled} onChange={this.onChange} />
                            </div>
                    </div>
                    <div className="bd-description-wrap scroller-wrap fade"><div className="bd-description scroller">{description}</div></div>
                    {this.footer}
                </div>;
    }
}
