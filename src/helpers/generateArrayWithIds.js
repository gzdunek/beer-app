const generateArrayWithIds = (count = 1) => {
  const array = [];
  for (let i = 0; i < count; i += 1) {
    array.push({ id: i });
  }

  return array;
};

export default generateArrayWithIds;
