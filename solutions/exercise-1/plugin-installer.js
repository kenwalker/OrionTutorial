/**
 * An Orion plugin that extends the navigator to install the selected file as a plugin. Useful for plugin development.
 * Idea by bernhard.lutzmann@gmail.com at EclipseCon Europe 2012.
 */
 
// The following comment tells JSLint which variables are globals thus removing the errors.
/*global orion window */

window.onload = function() {

    // create the plugin headers
    var headers = {
        name: "Plugin Installer",
        version: "1.0",
        description: "This plugin provides a Navigator action to install a plugin."
    };

    // Create the provider based on the headers
    var provider = new orion.PluginProvider(headers);

    // Define the properties for this service, the menu item will appear with the name and hover help
    var serviceProperties = {
        name: "Install plugin",
        tooltip: 'Open the settings page ready to install this plugin',
        contentType: ["text/html"],
        uriTemplate: "{OrionHome}/settings/settings.html#,category=plugins,installPlugin={OrionHome}{Location}"
    };

    // Register and connect the plugin installer service
    provider.registerService("orion.navigate.command", {}, serviceProperties);
    provider.connect();
};