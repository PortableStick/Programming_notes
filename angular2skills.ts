// A directive is how we add dynamic behavior to HTML
// There are 3 different types
// 1) Components
// 2) Strctural
// 3) Attribute

// Components are the basic building blocks of Angular2.  They control a portion of the screen and have templates.

// Strctural directives alter our layout by adding, removing, or replacing HTML elements.
// *ngFor
// *ngIf

//Decorators are like mixins; They add functionality.

// Define loops
@Component({
    selector: 'my-app',
    template: `<h1>{{ title }}</h1>
        <ul>
            <li *ngFor="let item of arrayOfItems">
                <h2>{{item.property1}}</h2>
                <p>{{item.property2}}</p>
                <p *ngIf="item.property3 > 0">{{item.property3}}</p>
            </li>
        </ul>
    `
})

// Pipes take data input and format an output
// They take parameters with colons
@Component({
    selector: 'my-app',
    template: `<h1>{{ title | uppercase }}</h1>
        <ul>
            <li *ngFor="let item of arrayOfItems">
                <h2>{{item.property1}}</h2>
                <p>{{item.property2 | currency: 'USD':true}}</p>
                <p *ngIf="item.property3 > 0">{{item.property3}}</p>
            </li>
        </ul>
    `
})

class SomeComponent {
    someField = "We don't need 'var' or 'let' keywords"
    someComponentMethod() {
        return this.someField;
    }
}