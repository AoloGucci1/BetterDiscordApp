export default [
    {
        type: "category",
        id: "general",
        collapsible: true,
        settings: [
            {type: "switch", id: "emotes", value: true},
            {type: "switch", id: "publicServers", value: true},
            {type: "switch", id: "voiceDisconnect", value: false},
            {type: "switch", id: "twentyFourHour", value: false},
            {type: "switch", id: "classNormalizer", value: true},
            {type: "switch", id: "showToasts", value: true}
        ]
    },
    {
        type: "category",
        id: "appearance",
        collapsible: true,
        settings: [
            {type: "switch", id: "voiceMode", value: false},
            {type: "switch", id: "minimalMode", value: false},
            {type: "switch", id: "hideChannels", value: false, enableWith: "minimalMode"},
            {type: "switch", id: "darkMode", value: true},
            {type: "switch", id: "coloredText", value: false}
        ]
    },
    {
        type: "category",
        id: "addons",
        collapsible: true,
        settings: [
            {type: "switch", id: "addonErrors", value: true},
            {type: "switch", id: "autoScroll", value: true},
            {type: "switch", id: "autoReload", value: true}
        ]
    },
    {
        type: "category",
        id: "customcss",
        collapsible: true,
        shown: false,
        settings: [
            {type: "switch", id: "customcss", value: true},
            {type: "switch", id: "liveUpdate", value: false},
            {type: "switch", id: "startDetached", value: false, disableWith: "nativeOpen"},
            {type: "switch", id: "nativeOpen", value: false, disableWith: "startDetached"}
        ]
    },
    {
        type: "category",
        id: "developer",
        collapsible: true,
        shown: false,
        settings: [
            {type: "switch", id: "developerMode", value: false},
            {type: "switch", id: "copySelector", value: false, enableWith: "developerMode"}
        ]
    },
    {
        type: "category",
        id: "window",
        collapsible: true,
        shown: false,
        settings: [
            {type: "switch", id: "transparency", value: false},
            {type: "switch", id: "frame", value: false, hidden: true}
        ]
    }
];