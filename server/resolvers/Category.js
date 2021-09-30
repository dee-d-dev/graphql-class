const Category = {
  animals: (parent, args, { animals }) => {
    let animal = animals.filter((animal) => {
      return animal.category === parent.id;
    });

    return animal;
  },
};

module.exports = Category;
