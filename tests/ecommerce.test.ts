import { describe, it, expect, beforeEach } from "vitest";
import {
  addProduct,
  addToCart,
  calculateTotal,
  clearCart,
  applyShippingDiscount
} from "../src/ecommerce";

// describe - group related tests together
// it - individual test case
// expect - compare/ assertion of result
// before each - allow for set up 



describe("E-commerce System", () => { 
  beforeEach(() => {
    addProduct("Soap", 100, 10);
    addProduct("Shampoo", 200, 5);
    clearCart();
  });

  it("should calculate price of all products", () => {

    // arrange, act and assert - test pattern
    // arrange
    addToCart("Soap", 2);
    addToCart("Shampoo", 2);

    // act
    const sum = calculateTotal();

    // assert
    expect(sum).toBe(600);
  });

  it("should add items to cart", () => {

    // arrange
    let cart = {};

    // act
    cart = addToCart("Soap", 2);

    // assert
    expect(cart["Soap"]).toBe(2)
  });

  it("should add $10 shipping discount", ()=> {

    // arrange
    let cart = {};
    addToCart("Soap", 1);
    addToCart("Shampoo", 2);

    // act
    let sum = calculateTotal();

    sum = applyShippingDiscount(sum);

    // assert
    expect(sum).toBe(490);
  })

  it("should not add $10 shipping discount", ()=> {

    // arrange
    let cart = {};
    addToCart("Soap", 1);
    addToCart("Shampoo", 1);

    // act
    let sum = calculateTotal();

    sum = applyShippingDiscount(sum);

    // assert
    expect(sum).toBe(300);
  });

  it("should return insufficient stock", ()=>{

    // arrange
    let cart = {};

    // assert
    expect(() => addToCart("Beans",1)).toThrowError(/^Insufficient stock$/)
  })
});
