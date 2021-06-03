const visitPricing = {
  insurance: [
    {
      type: 'video',
      price: null,
    },
    {
      type: 'phone',
      price: 50,
    },
    {
      type: 'in_person',
      price: 100,
    }
  ],
  noInsurance: [
    {
      type: 'video',
      price: 50,
    },
    {
      type: 'phone',
      price: 100,
    },
    {
      type: 'in_person',
      price: 200,
    }
  ]
}
export default visitPricing;
