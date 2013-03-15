/**
 * An Orion plugin that extends the navigator to install the selected file as a plugin. Useful for plugin development.
 * Idea by bernhard.lutzmann@gmail.com at EclipseCon Europe 2012.
 */
 
// The following comment tells JSLint which variables are globals thus removing the errors.
/*global define orion window */

window.onload = function() {

    // create the plugin headers
    //TODO Fix the JSON object below
    var headers = {
        name: /*NAME*/,
        version: /*VERSION*/,
        description: /*DESCRIPTION*/
    };

    // Create the provider based on the headers
    //TODO Pass your created header object
    var provider = new orion.PluginProvider(/*HEADERS*/);

    // Define the properties for this service, the menu item will appear with the name and hover help
    // When selected you can see that a URL is constructed to direct navigation to the settings page
    //TODO Pick a name and tooltip for the menu item that will show up in the Navigator
    var serviceProperties = {
        name: /* MENUITEMNAME */,
        tooltip: /* TOOLTIP */,
        contentType: ["text/html"],
        uriTemplate: "{OrionHome}/settings/settings.html#,category=plugins,installPlugin={OrionHome}{Location}"
    };

    // Register and connect the plugin installer service
    provider.registerService("orion.navigate.command", {}, serviceProperties);
    provider.connect();
};