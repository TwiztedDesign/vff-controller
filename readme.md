# Videoflow Components Library

This library provides HTML components and Layout helper classes that will allow you to create your
Videoflow controllers out of the box.

## Videoflow Controllers

Videflow controllers allow you to manage your visual engagement data in most intuitive way. 

## Loading dependencies

##### Javascript
```html
<script type="module" src="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.esm.js"></script>
<script nomodule="" src="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.js"></script>
```

##### CSS
```html
<link rel="stylesheet" href="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.css"/>
```

##### Starter Template
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

## How to use of this library

##### Tabs
Tabs used to control section visibility.
Each tab have a ```for``` attribute : ```html<vff-tab for="section_id">```.<br/>
This attribute specifies which content section a tab is bound.

##### Sections
Sections used to visually divide controllers, each section holds controllers needed for a specific engagement screen.<br/>
In order to allow a section to be bound to a tab it must have the same ```id=section_id``` as the tab.

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