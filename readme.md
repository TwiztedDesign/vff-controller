# Videoflow Components Library

This library provides HTML components and Layout helper classes that will allow you to create your
Videoflow controllers out of the box.

## Videoflow Controllers

Videflow controllers allow you to manage your visual engagement data in most intuitive way. 

## Loading dependencies

##### Javascript
```
<script type="module" src="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.esm.js"></script>
<script nomodule="" src="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.js"></script>
```

##### CSS
```
<link rel="stylesheet" href="https://unpkg.com/vff-controllers/dist/vff-controller/vff-controller.css"/>
```

## Start building your Videoflow controllers:

```
<vff-tabs default="section1">
  <vff-tab for="section1">First</vff-tab>
  <vff-tab for="section2">Second</vff-tab>
  <vff-tab for="section3">Third</vff-tab>
</vff-tabs>

<section id="section1" class="section ctrl-container">
  [YOUR HTML HERE]
</section>
<section id="section2" class="section ctrl-container">
  [YOUR HTML HERE]
</section>
<section id="section3" class="section ctrl-container">
  [YOUR HTML HERE]
</section>
```