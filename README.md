[![Build Status](https://travis-ci.org/gianmarcotoso/react-attire.svg?branch=master)](https://travis-ci.org/gianmarcotoso/react-attire)
[![npm version](https://badge.fury.io/js/react-attire.svg)](https://badge.fury.io/js/react-attire)
[![CryptoTip](https://img.shields.io/badge/Donate%20with-CryptoTip-blue.svg?style=flat&colorB=007bff)](https://cryptotip.it/p/gianmarcotoso)

# Attire

A dress code for your React forms. 

This package contains a component and some utility functions that should make your life easier when dealing with forms with ReactJS. It has no hard dependencies but does obviously require React to work.

## Installation

```
npm install --save react-attire
```

Typings are bundled within the main package, so they should work out of the box!

## How does it work?

The `Attire` component uses a [render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) to keep track of a form's internal state, providing both the current value of each form element and a callback to change it. 

### Basic Usage

Attire works by hiding the form's state management behind the `Attire` component's implementation. You just need to provide the `name`, `value` and `onChange` props for each or your inputs. 

Here's a simple example:

```
import React from 'react'
import { Attire } from 'react-attire'

class MyForm extends React.Component {
    render() {
        return (
            <Attire>
                {(data, onChange) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={onChange} />
                    </div>
                )}
            </Attire>
        )
    }
}
```

### Custom form inputs

There are cases when you won't use regular `input`s, but some other, more exotic controls (think of a custom datepicker, for example). In these cases, you can call Attire's `onChange` callback by explicitly passing both the name and the new value:

```
import React from 'react'
import { Attire } from 'react-attire'
import { DatePicker } from 'some-datepicker-component'

class MyForm extends React.Component {
    render() {
        return (
            <Attire>
                {(data, onChange) => (
                    <div>
                        <label>Your birthday:</label>
                        <DatePicker currentDate={data.birthday} onChange={date => onChange('birthday', date)} />
                    </div>
                )}
            </Attire>
        )
    }
}
```

This approch also works well when you want to handle subforms that are rendered within their own component and use a callback to notify the parent form of a change in their data, as the second parameter passed to the `onChange` callback can be of _any_ type (Attire doesn't make any assumption).

> 🎓 **Did you know?**
> 
> Yes, you can probably use inline functions, [the world is not going to explode](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578).

### Changing multiple fields at once

Sometimes it may be useful to change more than one field at once. You can do so by calling the `onChange` function passing it an object as its only argument; all the object keys will be set/updated on the Attire's instance internal state:

```
import React from 'react'
import { Attire } from 'react-attire'

class MyForm extends React.Component {
    render() {
        return (
            <Attire>
                {(data, onChange) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={(e) => onChange({
                            name: e.target.value,
                            random: Math.random()
                        })} />
                        {data.random && <p>The latest random number is {data.random}</p>}
                    </div>
                )}
            </Attire>
        )
    }
}
```

### Setting the initial state

As with most forms, you'll probably want to initialize it with some values. You can do so by passing an `initial` prop to the `Attire` component:

```
import React from 'react'
import { Attire } from 'react-attire'

class MyForm extends React.Component {
    render() {
        return (
            <Attire initial={{name: 'Frankie Frankson'}}>
                {(data, onChange) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={onChange} />
                    </div>
                )}
            </Attire>
        )
    }
}
```

### Global change notification

If you want to call a function every time something changes in your form, regardless of which field, you can pass a callback to the `onChange` prop of the `Attire` component. This is **not** the same as the `onChange` callback passed to your render prop! (I might want to change the name of either one at some point, if you have suggestions open an issue):

```
import React from 'react'
import { Attire } from 'react-attire'

class MyForm extends React.Component {
    render() {
        return (
            <Attire onChange={data => console.log('I sense a disturbance in the Force...', data)}>
                {(data, onChange) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={onChange} />
                    </div>
                )}
            </Attire>
        )
    }
}
```

### Resetting the state

Let's say you want to include a reset button to clear your form. How would you go about clearing a state that is outside of your control? `Attire` provides a third argument to your render prop, a `reset` function you can call to reset the form to its initial state. Calling this function will also trigger the global `onChange` callback if present.

```
import React from 'react'
import { Attire } from 'react-attire'

class MyForm extends React.Component {
    render() {
        return (
            <Attire initial={{name: 'Frankie Frankson'}}>
                {(data, onChange, reset) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={onChange} />

                        <button onClick={reset}>Reset my name!</button>
                    </div>
                )}
            </Attire>
        )
    }
}
```

### Form Validation

It's nice to include some kind of client-side validation on your form. `Attire` makes no assumption on how your data should be validated, but I've included a `validate` function that you can use to add some validation logic; if you need a more complex solution, you can of course use an external library:

```
import React from 'react'
import { Attire, validate } from 'react-attire'

const validateMyForm = validate({ name: v => v && v.length > 3 })

class MyForm extends React.Component {
    handleFormSubmit = (data) => {
        validateMyForm(data)
            .then(() => {
                console.log('All good!')
            })
            .catch(validationStatus => {
                console.error('Validation error', validationStatus)
            })
    }

    render() {
        return (
            <Attire initial={{name: 'Frankie Frankson'}}>
                {(data, onChange, reset) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={onChange} />

                        <button onClick={() => this.handleFormSubmit(data)}>Go!</button>
                    </div>
                )}
            </Attire>
        )
    }
}
```

The function accepts an object that defines validation rules for any one of the fields of your form (you can include all of them, or just some) and your data, and returns a `Promise` which resolves when all rules are fullfilled, rejects otherwise. If it rejects, you'll get a `validationStatus` object specifying which fields have not passed validation. If you don't pass your data right away, you'll get a curried function that you'll be able to call later with your rules already set.

### Form Data Transformation

Much in the same spirit of validation, form data transformation can be useful whenever you want the data your user has entered to be transformed before being used. While you can do this manually, I've included a `transform` function that you can use:

```
import React from 'react'
import { Attire, validate, transform } from 'react-attire'

const validateMyForm = validate({ name: v => v && v.length > 3 })
const transformMyForm = transform({ name: v => v && v.toLowerCase() })

class MyForm extends React.Component {
    handleFormSubmit = (data) => {
        const transformedData = transformMyForm(data)

        validateMyForm(transformedData)
            .then(() => {
                console.log('All good!')
            })
            .catch(validationStatus => {
                console.error('Validation error', validationStatus)
            })
    }

    render() {
        return (
            <Attire initial={{name: 'Frankie Frankson'}}>
                {(data, onChange, reset) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={onChange} />

                        <button onClick={() => this.handleFormSubmit(data)}>Go!</button>
                    </div>
                )}
            </Attire>
        )
    }
}
```

### "Uncontrolled input" warning

If some of your input values are undefined, React will complain that your inputs are changing from being uncontrolled to being controlled. You can avoid this by simply using an initial value or by using the `||` notation:

```
<input value={data.value || ''} />
```

Since this is ugly to see, I have provided a `value` function that does this for you:

```
import React from 'react'
import { Attire, value } from 'react-attire'

class MyForm extends React.Component {
    render() {
        return (
            <Attire>
                {(data, onChange) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={value(data.name)} onChange={onChange} />
                    </div>
                )}
            </Attire>
        )
    }
}
```

That's about it! :)

## Contributing

This was mostly a PoC I've made to see how render props fit in the "form" use case. If you see something you don't like or think that something is broken, please open an issue or better yet, make a PR!

## License

MIT
