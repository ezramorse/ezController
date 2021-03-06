# ezController

## Description

This is a minimalistic frontend 'controller' for one-page websites. It watches the hash and upon change, delivers the proper "route" while hiding the others. Beyond this 
default behavior, it can be used to initialize a section's state prior to loading and create custom transition animations between sections.

Please note: it will match the hashes to the corresponding elements with the same **data-page=""** values. All elements with the **data-page** attribute will be considered
sections that can be shown/hidden.

## Demo & Examples

* [http://www.ezramorse.com/js/ezController/demo/demo.html](http://www.ezramorse.com/js/ezController/demo/demo.html)
* [http://www.ezramorse.com/js/ezController/demo/demo2.html](http://www.ezramorse.com/js/ezController/demo/demo2.html)

## Example Usage

### HTML

```html
<section data-page="">
	<h2>Index Page</h2>
	<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem</p>
</section>
<section data-page="page2">
	<h2>Page 2</h2>
	<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
</section>
<section data-page="page3">
	<h2>Page 3</h2>
	<p>Dolar morum olor sit samet ite, elit consect adipi toscing elit. Gaenean modo doloremque laudantium ligula eget dolor.</p>
</section>
```

### jQuery

Use the plugin as follows:

```js
// Initialize the controller 
$('body').ezController();
```

## Arguments
| Name | Default | Description |
| :--------------- | :-------------- | :-------------------------------------------------------- | 
| **openClass** | 'ezControllerOpen' | Class to assign to the open section |
| **autoLoad** | true | Initiate the first transition based on the current hash |
| **setInTransition** | function(h) | Sets a transition flag. Useful for avoiding re-running the same animation upon double-clicks with custom transitions |
| **clearInTransition** | function(h) | Clears a transition flag |
| **defaultIntro** | function() | The default introduction transition that each section will perform only once on first load |
| **defaultTransition** | function() | The default transition. Evokes the defaultShow |
| **defaultShow** | function() | Unhides the sections meant to be displayed  |
| **defaultHide** | function() | Hides the last active section |
| **pages** | object | Definition of all active pages and their custom transitions & initialization function |

For the **pages** argument, refer to this example code:

```js
// Initialize the controller 
$('body').ezTransition({
	pages: {
		'somePageName' : {
			init: function(data, controllerObject) {},
			hide: function(data, controllerObject, transitionFunction) {},
			intro: function(data, controllerObject) {},
			transition: function(data, controllerObject) {}
		}
	}
}); 
```

* **data**: A shared object so that timeouts, intervals, animations and objects created in one transition can be manipulated, stopped or destroyed in another.
* **controllerObject**: The controller object, which can be used to evoke default hides/shows within the callback
* **transitionFunction**: This must be run to show the next section. It can be run before, after or during the current hide

## Methods
| Name | Description |
| :--------------- | :-------------------------------------------------------- | 
| **hashChanged()**| This only needs to be run if the 'autoLoad' argument is set to false to kick off the initial load |

## Installation

Include 'ezController.js' in your html file (preferably the footer)

## Notes

* Requires jQuery.
* Remember to hide all your initial elements so they do not show before the controller hides them.
* Have fun. Be creative. If you make some nice animated one-page websites with this, let me know.

## License

This plugin is available under:
[the MIT license](http://mths.be/mit)
[The GPL license](http://www.gnu.org/copyleft/gpl.html)
