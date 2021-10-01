const { uuid } = require("uuidv4");

const Mutation = {
  addAnimal: (
    parent,
    {
      title,
      image,
      rating,
      price,
      description,
      stock,
      slug,
      onSale,
      category,
    },
    { animals }
  ) => {
    let newAnimal = {
      id: uuid(),
      title,
      image,
      rating,
      price,
      description,
      stock,
      slug,
      onSale,
      category,
    };

    animals.push(newAnimal);

    return newAnimal;
  },

  removeAnimal: (parent, { id }, { animals }) => {
    let index = animals.findIndex((animal) => {
      return animal.id === id;
    });

    animals.splice(index, 1);
    return true;
  },
};

module.exports = Mutation;
