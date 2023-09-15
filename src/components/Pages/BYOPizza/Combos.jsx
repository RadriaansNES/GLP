import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions';
import Layout from '../../LayoutComp/Layout';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ComboCustomization({ addToCart }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [combo, setCombo] = useState(null);
    const [currentPizza, setCurrentPizza] = useState(1);
    const [selectedMeats, setSelectedMeats] = useState([]);
    const [selectedCheeses, setSelectedCheeses] = useState([]);
    const [selectedFruitVegetables, setSelectedFruitVegetables] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [addToCartClicked, setAddToCartClicked] = useState(false);
    const [pizzaOneToppings, setPizzaOneToppings] = useState([]);
    const [pizzaTwoToppings, setPizzaTwoToppings] = useState([]);

    const combos = [
        {
            id: 0,
            name: 'Special Combo',
            cdescrip: '2 Medium pizzas, 6 toppings',
            description: (
                <div>
                    2 Medium Pizzas
                    <br />
                    6 Toppings combined
                </div>
            ),
            price: 26.99,
        },
        {
            id: 1,
            name: 'COMBO 1',
            cdescrip: '2 Small pizzas, 6 toppings',
            description: (
                <div>
                    2 Small Pizzas
                    <br />
                    6 Toppings combined
                </div>
            ),
            price: 21.99,
        },
        {
            id: 2,
            name: 'COMBO 2',
            cdescrip: '1 Medium classic pizza',
            description: (
                <div>
                    1 Medium Classic Pizza
                </div>
            ),
            price: 17.49,
        },
        {
            id: 3,
            name: 'COMBO 3',
            cdescrip: '1 Large pizza, 1 topping',
            description: (
                <div>
                    1 Large Pizza
                    <br />
                    1 Topping
                    <br />
                    Pick-up Only
                </div>
            ),
            price: 11.99,
        },
        {
            id: 4,
            name: 'COMBO 4',
            cdescrip: '1 Large pizza, 3 toppings, 4 pack of Coke',
            description: (
                <div>
                    1 Large Pizza
                    <br />
                    3 Toppings
                    <br />
                    4 pack of Coke
                </div>
            ),
            price: 23.99,
        },
        {
            id: 5,
            name: 'COMBO 5',
            cdescrip: '1 Extra large pizza, 3 toppings',
            description: (
                <div>
                    1 Extra Large Pizza
                    <br />
                    3 Toppings
                </div>
            ),
            price: 22.99,
        },
        {
            id: 6,
            name: 'COMBO 6',
            cdescrip: '2 Large pizzas, 6 toppings',
            description: (
                <div>
                    2 Large Pizzas
                    <br />
                    6 Toppings combined
                </div>
            ),
            price: 21.99,
        },
    ];

    useEffect(() => {
        // Fetch combo data based on the 'id' from the URL parameters
        if (id) {
            const comboId = parseInt(id, 10);
            const selectedCombo = combos.find((c) => c.id === comboId);

            if (selectedCombo) {
                setCombo(selectedCombo);
            }
        }
    }, [id]);

    useEffect(() => {
        if (addToCartClicked) {
            const selectedToppings = [...selectedMeats, ...selectedCheeses, ...selectedFruitVegetables];

            // Create the pizza
            const pizza = {
                name: `Pizza ${currentPizza} - ${combo.name}`,
                description: `Toppings: ${selectedToppings.join(', ')}`,
                price: calculatePizzaPrice(selectedToppings),
                quantity: 1,
            };
            addToCart(pizza);

            // Change the current pizza to the next one
            setCurrentPizza(currentPizza === 1 ? 2 : 1);
            setAlertMessage('Combo added to cart');

            // Reset the addToCartClicked state
            setAddToCartClicked(false);
        }
    }, [addToCartClicked, selectedMeats, selectedCheeses, selectedFruitVegetables, currentPizza, combo]);

    const handleMeatChange = (e) => {
        const meat = e.target.value;
        setSelectedMeats((prevMeats) =>
            prevMeats.includes(meat)
                ? prevMeats.filter((item) => item !== meat)
                : [...prevMeats, meat]
        );
    };

    const handleCheeseChange = (e) => {
        const cheese = e.target.value;
        setSelectedCheeses((prevCheeses) =>
            prevCheeses.includes(cheese)
                ? prevCheeses.filter((item) => item !== cheese)
                : [...prevCheeses, cheese]
        );
    };

    const handleFruitVegetableChange = (e) => {
        const fruitVegetable = e.target.value;
        setSelectedFruitVegetables((prevFruitVegetables) =>
            prevFruitVegetables.includes(fruitVegetable)
                ? prevFruitVegetables.filter((item) => item !== fruitVegetable)
                : [...prevFruitVegetables, fruitVegetable]
        );
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
    
        const selectedToppings = [...selectedMeats, ...selectedCheeses, ...selectedFruitVegetables];
    
        if (currentPizza === 1) {
            setPizzaOneToppings(selectedToppings);
            setCurrentPizza(2);
            setAlertMessage('Pizza One added to cart');
    
            // Scroll back to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
    
            // Clear the selected checkboxes
            setSelectedMeats([]);
            setSelectedCheeses([]);
            setSelectedFruitVegetables([]);
        } else {
            // Pizza Two customization is complete; add the combo to cart
            const comboDescription = `Pizza 1 toppings: ${pizzaOneToppings.join(', ')} , Pizza 2 toppings: ${selectedToppings.join(', ')}`;
            const comboPizza = {
                name: `${combo.name}`,
                description: comboDescription,
                price: calculatePizzaPrice([...pizzaOneToppings, ...selectedToppings]),
                quantity: 1,
            };
    
            addToCart(comboPizza);
    
            // Reset the customization for the next combo
            setPizzaOneToppings([]);
            setCurrentPizza(1);
            setAlertMessage('Combo added to cart');
    
            // Check if it's the last pizza in the combo and navigate to the cart
            if (combo.id !== null /* Add a condition to check if it's the last pizza */) {
                navigate('/Checkout'); // Redirect to the cart page
            }
        }
    };
    

    const calculatePizzaPrice = (selectedToppings) => {
        if (!combo) return 0;

        const baseComboPrice = combo.price;

        // Define topping limits for each combo
        const comboToppingLimits = {
            0: 6,  // Combo 0 - 6 toppings allowed
            1: 6,  // Combo 1 - 6 toppings allowed
            2: 3,  // Combo 2 - 3 toppings allowed
            3: 1,  // Combo 3 - 1 topping allowed
            4: 3,  // Combo 4 - 3 toppings allowed
            5: 3,  // Combo 5 - 3 toppings allowed
            6: 6   // Combo 6 - 6 toppings allowed
        };

        const additionalToppingsCostPerCombo = 2.5; // Cost for additional toppings per combo

        const toppingLimit = comboToppingLimits[combo.id];
        const extraToppings = Math.max(0, selectedToppings.length - toppingLimit);

        // Calculate the additional cost for extra toppings
        const extraToppingsCost = extraToppings * additionalToppingsCostPerCombo;

        // Calculate the total price considering the combo price and extra toppings cost
        const totalPrice = baseComboPrice + extraToppingsCost;

        return totalPrice;
    };

    return (
        <Layout alertMessage={alertMessage} setAlertMessage={setAlertMessage}>
            <div className='header'>
                <h1>{combo ? `Customize Pizza ${currentPizza}` : 'Loading...'}</h1>
            </div>
            <form className='BYOP-Creator'>
                <div className='BYOPContainer'>
                    {/* Meats Section */}
                    <div className='Selection'>
                        <h3>SELECT YOUR MEATS</h3>
                        <div className='options'>
                            {[
                                'Anchovies',
                                'Pepperoni',
                                'Chicken',
                                'Bacon',
                                'Italian Sausage',
                                'Ham',
                                'Ground Beef',
                                // Add other meats here
                            ].map((meat) => (
                                <label key={meat}>
                                    <input
                                        type='checkbox'
                                        name='meat'
                                        value={meat}
                                        checked={selectedMeats.includes(meat)}
                                        onChange={handleMeatChange}
                                    />
                                    {meat}
                                </label>
                            ))}
                            <p id='note'>Please note chicken will count as two toppings.</p>
                        </div>
                    </div>

                    {/* Cheeses Section */}
                    <div className='Selection'>
                        <h3>SELECT YOUR CHEESES</h3>
                        <div className='options'>
                            {[
                                'Asiago Cheese',
                                'Extra Cheese',
                                'Cheddar Cheese',
                                'Feta Cheese',
                                'Parmesan Cheese',
                                // Add other cheeses here
                            ].map((cheese) => (
                                <label key={cheese}>
                                    <input
                                        type='checkbox'
                                        name='cheese'
                                        value={cheese}
                                        checked={selectedCheeses.includes(cheese)}
                                        onChange={handleCheeseChange}
                                    />
                                    {cheese}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Fruits/Vegetables Section */}
                    <div className='Selection'>
                        <h3>SELECT YOUR FRUITS/VEGETABLES</h3>
                        <div className='options'>
                            {[
                                'Pineapple',
                                'Onions',
                                'Green Olives',
                                'Italian Spices',
                                'Garlic',
                                'Garlic Butter Crust',
                                'Mushrooms',
                                'Red Onions',
                                'Black Olives',
                                'Hot Peppers',
                                'Green Peppers',
                                'Broccoli',
                                'Tomatoes',
                                'Roasted Red Peppers',
                                'Jalapeno Peppers',
                                'Extra Sauce (free)',
                                // Add other fruits/vegetables here
                            ].map((fruitVegetable) => (
                                <label key={fruitVegetable}>
                                    <input
                                        type='checkbox'
                                        name='fruitVegetable'
                                        value={fruitVegetable}
                                        checked={selectedFruitVegetables.includes(fruitVegetable)}
                                        onChange={handleFruitVegetableChange}
                                    />
                                    {fruitVegetable}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Remove the pizza size selection */}
                    <div className='SelectionF'>
                        <p><strong>Total is ${calculatePizzaPrice([...selectedMeats, ...selectedCheeses, ...selectedFruitVegetables])}</strong></p>
                        <button id='checkB' onClick={handleAddToCart}>
                            {currentPizza === 1 ? 'Add Pizza One to Cart' : 'Add Pizza Two to Cart'}
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}

export default connect(null, { addToCart })(ComboCustomization);

