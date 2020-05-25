<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
[](#table-of-contents)

## Table of contents
* [Videoflow Controllers Library](#Videoflow_Controllers_Library)
* [Videoflow Controllers](#Videoflow_Controllers)
* [Loading dependencies](#Loading_dependencies)
* [Starter Template](#Starter_Template)
* [How to use this library](#How_to_use_this_library)
* [Using Controllers](#Using_Controllers)
* [Available Controllers](#Available_Controllers)
  - [vff-checkbox](#vff-checkbox)
  - [vff-radio-button](#vff-radio-button)
  - [vff-image-browser](#vff-image-browser)
  - [vff-color-picker](#vff-color-picker)
  - [vff-select](#vff-select)
  - [vff-text](#vff-text)
  - [vff-range](#vff-range)
  - [vff-video-time](#vff-video-time)


[](#a-namevideoflow_controllers_librarya-videoflow-controllers-library)

## <a name="Videoflow_Controllers_Library"></a> Videoflow Controllers Library

This library provides HTML components and Layout helper classes that will allow you to create your
Videoflow controllers out of the box.


[](#a-namevideoflow_controllersa-videoflow-controllers)

## <a name="Videoflow_Controllers"></a> Videoflow Controllers

Videflow controllers allow you to manage your visual engagement data in most intuitive way.<br/>
Controllers are HTML elements and can be simply used inside you're HTML. <br/>
Please note, VFF controllers are Custom Elements and can not be self closing tags.
The proper way of using a component is by always writing the opening and the closing tag:
```html
    <vff-custom-component></vff-custom-component>
```


[](#a-nameloading_dependenciesa-loading-dependencies)

## <a name="Loading_dependencies"></a> Loading dependencies

##### Javascript
```html
<script type="module" src="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.esm.js"></script>
<script nomodule="" src="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.js"></script>
```

##### CSS
```html
<link rel="stylesheet" href="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.css"/>
```


[](#a-namestarter_templatea-starter-template)

## <a name="Starter_Template"></a> Starter Template
```html
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <title>Videflow Controllers Starter</title>

  <!-- Videoflow CSS  -->
  <link rel="stylesheet" href="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.css"/>

  <!-- Videoflow Controllers  -->
  <script type="module" src="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.esm.js"></script>
  <script nomodule="" src="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.js"></script>
</head>
<body>
    <vff-tabs default="section1">
      <vff-tab for="section1">First</vff-tab>
      <vff-tab for="section2">Second</vff-tab>
      <vff-tab for="section3">Third</vff-tab>
    </vff-tabs>
    
    <div id="section1" class="ctrl-container">
        <div class="ctrl-container-row">[YOUR HTML HERE]</div>
    </div>
    <div id="section2" class="ctrl-container">
        <div class="ctrl-container-row">[YOUR HTML HERE]</div>
    </div>
    <div id="section3" class="ctrl-container">
        <div class="ctrl-container-row">[YOUR HTML HERE]</div>
    </div>
</body>
</html>
```


[](#a-namehow_to_use_this_librarya-how-to-use-this-library)

## <a name="How_to_use_this_library"></a> How to use this library

##### Basic Layout
A section must have a ```ctrl-container``` class ```html<div id="section1" class="ctrl-container">```
This is needed in order to control section visibility and give a section the initial CSS it needs.
<br/>
Each direct descendant of a ```ctrl-container``` must have in  ```ctrl-container-row``` class.
```html
<div id="section1" class="ctrl-container">
    <div class="ctrl-container-row">[YOUR HTML HERE]</div>
</div>
```

##### Tabs
Tabs used to control section visibility.
Each tab has a ```for``` attribute : ```html<vff-tab for="section_id">```.<br/>
This attribute specifies which content section a tab is bound to.
```html
<vff-tabs>
    <vff-tab for="section1">First</vff-tab>
</vff-tabs>
```

##### Sections
Sections used to visually divide controllers, each section holds controllers needed for a specific engagement screen.<br/>
In order to allow a section to be bound to a tab it must have the same ```id=section_id``` as the tab.
```html
<div id="section1" class="ctrl-container"></div>
```

##### Classes
###### .ctrl-container
###### .ctrl-container-row
###### .ctrl-container-block


[](#a-nameusing_controllersa-using-controllers)

## <a name="Using_Controllers"></a> Using Controllers
Common events that each component fires in different stages of it's life cycle:<br/>
<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Payload</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>vff:init</td><td>{data, target: HTMLElement}</td><td>Right after a controller has been attached to DOM.</td></tr>
    <tr><td>vff:change</td><td>{data, target: HTMLElement}</td><td>Each time when a change from user interface of a controller is received.</td></tr>
    <tr><td>vff:remove</td><td>{data, target: HTMLElement}</td><td>Each time a controller has been detached from DOM</td></tr>
  </tbody> 
</table>

Common events that each component listens to:<br/>
<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Payload</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>vff:update</td><td>{dataAttrName: string, dataAttrValue: string, value}</td><td>Each component can be updated with new data.</td></tr>
  </tbody>
</table>


[](#a-nameavailable_controllersa-available-controllers)

## <a name="Available_Controllers"></a> Available Controllers
After setting up the basic layout, you can start declaring which controllers your layout will include. 
<br/>

#### vff-checkbox

```html 
<vff-checkbox>You can have you're text here!</vff-checkbox>
```

###### Properties

Name | Type | Default | Description
:----------- | :----------- | :----------- | :-----------
value | boolean | false | Sets or returns the value of the value attribute of a checkbox


<br/>

#### vff-radio-button

<p>Radio buttons let a user select only one of a limited number of choices.</p>

```html 
<vff-radio-button name="radio-group">Radio1</vff-radio-button>
<vff-radio-button name="radio-group">Radio2</vff-radio-button>
<vff-radio-button name="radio-group">Radio3</vff-radio-button>
```

###### Properties

Name | Type | Default | Description
:----------- | :----------- | :----------- | :-----------
checked | boolean | false | Sets or returns the checked state of a radio button.
name | string | 'radio' | Sets or returns the value of the name attribute of the radio button.
value | string | 'on' | Sets or returns the value of the value attribute of the radio button.


<br/>

#### vff-image-browser

<p>Image Browser provides drag’n’drop and upload button file uploads with image previews.</p>

```html 
<vff-image-browser></vff-image-browser>
```

###### Properties

Name | Type | Default | Description
:----------- | :----------- | :----------- | :-----------
error | string | '' | Sets related error messages. Error text is cleared after 10 secs or on click.
progress | boolean | false | Set this property to enable progress bar UI.
progressStatus | number | 0 | Set to control the progress bar value.
selectedFiles | File[] | [] | Returns array of File objects that represent selected file or files.
value | string | '' | Sets and returns image url for preview only. Previewed image will not be registered in selectedFiles.


###### Methods

Name | Parameters | Returns | Description
:----------- | :----------- | :----------- | :-----------
addFiles | files : File[]  | Promise<void> | Sets File objects that represent selected file or files


<br/>

#### vff-color-picker

<p>This component is a wrapper of color <a href="https://github.com/Simonwep/pickr">pickr</a> by Simonwep</p>

```html 
<vff-color-picker></vff-color-picker>
```

###### Properties

Name | Type | Default | Description
:----------- | :----------- | :----------- | :-----------
value | string | '#FFFFFF' | Sets or returns the current color of a color-picker


<br/>

#### vff-select

```html 
<vff-select></vff-select>
```

###### Properties

Name | Type | Default | Description
:----------- | :----------- | :----------- | :-----------
multiple | boolean | false | Enables multiple selection
options | SelectItem[] | [] | Sets or return all available options
selectText | string | 'CHOOSE OPTION' | Sets text to show for a user
value | SelectItem[] | [] | Sets or returns selected options


<strong>Important: </strong>When setting the options, the <strong>key</strong> must be a unique value to avoid unexpected behaviour.</td></tr>
<br/>

#### vff-text

```html 
<vff-text></vff-text>
```

###### Properties

Name | Type | Default | Description
:----------- | :----------- | :----------- | :-----------
multiline | boolean | false | Defines a multi-line text input control
placeholder | string | '' | Specifies a short hint that describes the expected value of a text area
value | string | '' | Sets or returns the contents of a text area


<br/>

#### vff-range

```html 
<vff-range></vff-range>
```

###### Properties

Name | Type | Default | Description
:----------- | :----------- | :----------- | :-----------
max | number | 100 | Sets or returns the maximum value allowed.
min | number | 0 | Sets or returns the minimum value allowed.
step | number | 1 | Sets or returns the number of intervals of a slider control.
value | number | this.max / 2 | Sets or returns the value of a slider control.


<br/>

#### vff-video-time

```html 
<vff-video-time></vff-video-time>
```

###### Properties

Name | Type | Default | Description
:----------- | :----------- | :----------- | :-----------
value | number | 0 | Sets or returns the value in seconds.


<br/>