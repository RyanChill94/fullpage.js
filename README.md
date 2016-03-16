# fullpage.js

## how to use
```html
  <div class="section-group">
    <section class="area-01" data-title="标题一"><h2>标题一</h2></section>
    <section class="area-02" data-title="标题二"><h2>标题二</h2></section>
    <section class="area-03" data-title="标题三"><h2>标题三</h2></section>
    <section class="area-04" data-title="标题四"><h2>标题四</h2></section>
    <section class="area-05" data-title="标题五"><h2>标题五</h2></section>
</div>

```

```javascript
$('.section-group').fullPage();
$(document)
                .on('beforeShow.from.fullpage', '.section-group', function (e) {
                    e.item.addClass('active');
                })
                .on('beforeHidden.from.fullpage', '.section-group', function (e) {
                    e.item.removeClass('active');
                });
```
A simple plugin to create fullscreen scrolling websites
