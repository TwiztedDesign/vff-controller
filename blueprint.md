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

## <a name="Videoflow_Controllers_Library"></a> Videoflow Controllers Library

This library provides HTML components and Layout helper classes that will allow you to create your
Videoflow controllers out of the box.

## <a name="Videoflow_Controllers"></a> Videoflow Controllers

Videflow controllers allow you to manage your visual engagement data in most intuitive way.<br/>
Controllers are HTML elements and can be simply used inside you're HTML. <br/>
Please note, VFF controllers are Custom Elements and can not be self closing tags.
The proper way of using a component is by always writing the opening and the closing tag:
```html
    <vff-custom-component></vff-custom-component>
```

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

## <a name="Available_Controllers"></a> Available Controllers
After setting up the basic layout, you can start declaring which controllers your layout will include. 
<br/>
{{ load:src/components/checkbox/readme2.md }}
<br/>
{{ load:src/components/radio-button/readme2.md }}
<br/>
{{ load:src/components/image-browser/readme2.md }}
<br/>
{{ load:src/components/color-picker/readme2.md }}
<br/>
{{ load:src/components/select/readme2.md }}
<strong>Important: </strong>When setting the options, the <strong>key</strong> must be a unique value to avoid unexpected behaviour.</td></tr>
<br/>
{{ load:src/components/text/readme2.md }}
<br/>
{{ load:src/components/range/readme2.md }}
<br/>
{{ load:src/components/video-time/readme2.md }}
<br/>