require ('./shoppingcart.model');

const NAMESPACE = 'nn',
  MODULE_NAME = 'shoppingcartModel',
  UPPERCASE_MODULE_NAME = MODULE_NAME.toUpperCase();

const _ = {
  productA: {
    name: 'a',
    price: 1.50,
    quantity: 1
  },
  productB: {
    name: 'b',
    price: 2.50,
    quantity: 2
  },
  productC: {
    name: 'c',
    price: 3.50,
    quantity: 3
  },
  emptyCart: {
    total: {
      beforeVAT: 0,
      afterVAT: 0,
      VAT: 0
    },
    products: []
  },
  getVAT: (beforeVAT, VATRate) => {
    return (beforeVAT / 100) * VATRate;
  },
  getAfterVAT: (beforeVAT, VAT) => {
    return beforeVAT + VAT;
  }
};

describe(`Instance of ${UPPERCASE_MODULE_NAME} initialized WITHOUT state`, () => {
  let instance,
    productWithoutQuantity,
    productWithQuantity,
    cart,
    expectedBeforeVAT,
    expectedAfterVAT
  beforeEach(() => {
    instance = new window[NAMESPACE][MODULE_NAME]();
    instance.init();
    productWithoutQuantity = Object.assign({}, _.productA);
    delete productWithoutQuantity.quantity;
    productWithQuantity = Object.assign({}, _.productB);
  });

  test('the cart should be empty', () => {
    expect(instance.getCart()).toEqual(_.emptyCart);
  });

  describe('and ONE product WITH defined QUANTITY was ADDED', () => {
    beforeEach(() => {
      cart = instance.addProducts(productWithQuantity);
    });

    test('the cart\'s products should be the same', () => {
      expect(cart.products).toEqual([productWithQuantity]);
    });

    test('the cart\'s beforeVAT should be correct', () => {
      const result = productWithQuantity.price * productWithQuantity.quantity;

      expect(cart.total.beforeVAT).toBe(result);
    });

    test('the cart\'s afterVAT should be the cart\'s beforeVAT as no taxes are defined', () => {
      expect(cart.total.afterVAT).toBe(cart.total.beforeVAT);
    });

    test('the cart\'s VAT should be correct', () => {
      expect(cart.total.VAT).toBe(0);
    });
  });

  describe('and ONE product WITHOUT defined QUANTITY was ADDED', () => {
    beforeEach(() => {
      cart = instance.addProducts(productWithoutQuantity);
    });

    test('the cart\'s products should be the same', () => {
      const result = Object.assign({}, productWithoutQuantity, { quantity: 1 });

      expect(cart.products).toEqual([result]);
    });
  });

  describe('and TWO TIMES the SAME product WITHOUT defined QUANTITY was ADDED', () => {
    beforeEach(() => {
      instance.addProducts(productWithoutQuantity);
      cart = instance.addProducts(productWithoutQuantity);
    });

    test('the cart\'s products should be the same', () => {
      const result = Object.assign({}, productWithoutQuantity, { quantity: 2 });
      expect(cart.products).toEqual([result]);
    });
  });

  describe('and TWO TIMES the SAME product WITH defined QUANTITY was ADDED', () => {
    beforeEach(() => {
      instance.addProducts(productWithQuantity);
      cart = instance.addProducts(productWithQuantity);

      expectedBeforeVAT =
        productWithQuantity.price * productWithQuantity.quantity * 2;

      expectedAfterVAT = expectedBeforeVAT;
    });

    test('the cart\'s products should be the same', () => {
      const result = Object.assign({}, productWithQuantity, { quantity: 2 });

      result.quantity += productWithQuantity.quantity;

      expect(cart.products).toEqual([result]);
    });

    test('the cart\'s beforeVAT should be correct', () => {
      expect(cart.total.beforeVAT).toBe(expectedBeforeVAT);
    });

    test('the cart\'s afterVAT should be the beforeVAT as no tax was set', () => {
      expect(cart.total.afterVAT).toBe(expectedAfterVAT);
    });

    test('the cart\'s VAT should be 0 as it was not set', () => {
      expect(cart.total.VAT).toBe(0);
    });
  });
});

describe(`Instance of ${UPPERCASE_MODULE_NAME} initialized WITH state of TWO DIFFERENT products AND a VATRATE`, () => { // eslint-disable-line max-len
  let instance,
    productA,
    productB,
    cart,
    products,
    VATRate,
    expectedVAT,
    expectedBeforeVAT,
    expectedAfterVAT

  beforeEach(() => {
    instance = window[NAMESPACE][MODULE_NAME]();

    productA = Object.assign({}, _.productA);
    productB = Object.assign({}, _.productB);
    products = [productA, productB];
    VATRate = 20;
    instance.init({
      'products': products,
      'VATRate': VATRate
    });
    cart = instance.getCart();

    expectedBeforeVAT = (productA.price * productA.quantity) +
      (productB.price * productB.quantity);

    expectedVAT = _.getVAT(expectedBeforeVAT, VATRate);

    expectedAfterVAT = _.getAfterVAT(
      expectedBeforeVAT, expectedVAT
    );
  });

  it('the cart\'s products should be the same', () => {
    expect(cart.products).toEqual(products);
  });

  test('the cart\'s beforeVAT should be correct', () => {
    expect(cart.total.beforeVAT).toEqual(expectedBeforeVAT);
  });

  test('the cart\'s afterVAT should be correct', () => {
    expect(cart.total.afterVAT).toEqual(expectedAfterVAT);
  });

  test('the cart\'s VAT should be correct', () => {
    expect(cart.total.VAT).toEqual(expectedVAT);
  });

  describe('and INCREMENTED one product\'s QUANTITY', () => {
    beforeEach(() => {
      cart = instance.changeProductQuantity(
        productA, productA.quantity + 1);

      expectedBeforeVAT += productA.price;
      expectedVAT = _.getVAT(expectedBeforeVAT, VATRate);
      expectedAfterVAT = _.getAfterVAT(
        expectedBeforeVAT, expectedVAT
      );
    });

    test('the cart\'s beforeVAT should be correct', () => {
      expect(cart.total.beforeVAT).toEqual(expectedBeforeVAT);
    });

    test('the cart\'s afterVAT should be correct', () => {
      expect(cart.total.afterVAT).toEqual(expectedAfterVAT);
    });

    test('the cart\'s VAT should be correct', () => {
      expect(cart.total.VAT).toEqual(expectedVAT);
    });
  });

  describe('and DECREMENTED one product\'s QUANTITY', () => {
    beforeEach(() => {
      cart = instance.changeProductQuantity(
        productB, productB.quantity - 1);

      expectedBeforeVAT -= productB.price;
      expectedVAT = _.getVAT(expectedBeforeVAT, VATRate);
      expectedAfterVAT = _.getAfterVAT(
        expectedBeforeVAT, expectedVAT
      );
    });

    test('the cart\'s beforeVAT should be correct', () => {
      expect(cart.total.beforeVAT).toEqual(expectedBeforeVAT);
    });

    test('the cart\'s afterVAT should be correct', () => {
      expect(cart.total.afterVAT).toEqual(expectedAfterVAT);
    });

    test('the cart\'s VAT should be correct', () => {
      expect(cart.total.VAT).toEqual(expectedVAT);
    });
  });

  describe('and tried to DECREMENT one product\'s QUANTITY to lower than 1', () => {
    beforeEach(() => {
      cart = instance.changeProductQuantity(
        productA, 0);
    });

    test('the cart\'s beforeVAT should be still be same', () => {
      expect(cart.total.beforeVAT).toEqual(expectedBeforeVAT);
    });
  });

  describe('and ONE product was REMOVED', () => {
    beforeEach(() => {
      cart = instance.removeProducts(productA);

      expectedBeforeVAT -= productA.price;
      expectedVAT = _.getVAT(expectedBeforeVAT, VATRate);
      expectedAfterVAT = _.getAfterVAT(
        expectedBeforeVAT, expectedVAT
      );
    });

    test('the cart\'s products should reflect this', () => {
      expect(cart.products).toEqual([productB]);
    });

    test('the cart\'s beforeVAT should be correct', () => {
      expect(cart.total.beforeVAT).toEqual(expectedBeforeVAT);
    });

    test('the cart\'s afterVAT should be correct', () => {
      expect(cart.total.afterVAT).toEqual(expectedAfterVAT);
    });

    test('the cart\'s VAT should be correct', () => {
      expect(cart.total.VAT).toEqual(expectedVAT);
    });
  });

  describe('and TWO products were REMOVED', () => {
    beforeEach(() => {
      cart = instance.removeProducts(products);
    });

    test('the cart should be empty', () => {
      expect(cart).toEqual(_.emptyCart);
    });
  });

  describe('and a NON EXISTING product was tried to be REMOVED', () => {
    beforeEach(() => {
      const product = Object.assign({}, _.productC);
      cart = instance.removeProducts(product);
    });

    test('the cart\'s products should be the same', () => {
      expect(cart.products).toEqual(products);
    });
  });

  test('destroying the instance should empty the cart', () => {
    instance.destroy();
    expect(instance.getCart()).toEqual(_.emptyCart);
  });
});
