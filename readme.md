## Table of contents
* [Videoflow Controllers Library](#Videoflow_Controllers_Library)
* [Videoflow Controllers](#Videoflow_Controllers)
* [Loading dependencies](#Loading_dependencies)
* [Starter Template](#Starter_Template)
* [How to use this library](#How_to_use_this_library)
* [Available Controllers](#Available_Controllers)
  - [vff-checkbox](#vff-checkbox)
  - [vff-radio-button](#vff-radio-button)
  - [vff-image-browser](#vff-image-browser)

## <a name="Videoflow_Controllers_Library"></a> Videoflow Controllers Library

This library provides HTML components and Layout helper classes that will allow you to create your
Videoflow controllers out of the box.

## <a name="Videoflow_Controllers"></a> Videoflow Controllers

Videflow controllers allow you to manage your visual engagement data in most intuitive way.<br/>
Controllers are HTML elements and can be simply used inside you're HTML.  

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
Each direct descendant of a ```ctrl-container``` must be wrapped in  ```ctrl-container-row``` class.
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

## <a name="Available_Controllers"></a> Available Controllers
 
###### <a name="vff-checkbox"></a> vff-checkbox:

```html 
    <vff-checkbox>You can have you're text here!</vff-checkbox>
```

Checkbox properties<br/>
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>value</td><td>Sets or returns the value of the value attribute of the checkbox</td></tr>
    <tr><td>checked</td><td>Sets or returns the checked state of a checkbox</td></tr>
  </tbody>
</table>
<br/>

###### <a name="vff-radio-button"></a> vff-radio-button:

```html 
    <vff-radio-button name="radio-group">Radio1</vff-radio-button>
    <vff-radio-button name="radio-group">Radio2</vff-radio-button>
    <vff-radio-button name="radio-group">Radio3</vff-radio-button>
```

Radio button properties<br/>
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>name</td><td>Sets or returns the value of the name attribute of the radio button</td></tr>
    <tr><td>value</td><td>Sets or returns the value of the value attribute of the radio button</td></tr>
    <tr><td>checked</td><td>Sets or returns the checked state of a radio button</td></tr>
  </tbody>
</table>
<br/>

###### <a name="vff-image-browser"></a> vff-image-browser:

<p>Image Browser provides drag’n’drop and upload button file uploads with image previews.</p>

```html
    <vff-image-browser></vff-image-browser>
```

Image Browser properties<br/>
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>selectedFiles</td><td>Returns array of File objects that represent selected file or files</td></tr>
  </tbody>
</table>
<br/>

Image Browser Methods<br/>
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Arguments</th>
      <th>Returns</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>addFiles</td><td>[File]</td><td>n/a</td><td>Sets File objects that represent selected file or files</td></tr>   
  </tbody>
</table>
<br/>

Image Browser Events<br/>
<table>
  <thead>
    <tr>
      <th>Name</th>     
      <th>Data</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>change</td><td>array of files</td><td>Each change to files in the image browser will result in change event</td></tr>   
  </tbody>
</table>
<br/>