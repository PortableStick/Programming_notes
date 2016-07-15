<script>
  /* Step 1: create the object prototype */
  var customElementPrototype = Object.create(HTMLElement.prototype)
    /* Step 2: define constructor */
customElementPrototype.createdCallback = function () {
  console.log("This is called as the element is created");
  this.textContent = "<h1>Helloworld</h1>";
};
/* Step 3: register component */
var customElementInstance1 = document.registerElement('custom-element', {
  prototype: customElementPrototype
});
</script>
<!-- /* Step 4: Use the element in the HTML */ -->
 <customElementInstance1></customElementInstance1>
<script>
/* Extending other elements */
var extendedElementPrototype = Object.create(HTMLButtonElement.prototype);
extendedElementPrototype.createdCallback = function () {
  this.style.opacity = 0.8;
  this.textContent = "Super fucking button";
};
var extendedElementInstance = document.registerElement('extended-element', {
  prototype: extendedElementPrototype,
  extends: 'button'
});
</script>
<!-- /* Must create using different syntax */ -->
<button is="extendedElementInstance"></button>


<pre>
    <code>
        <template>
            <!-- Template stuff goes here -->
        </template>
    </code>
</pre>
