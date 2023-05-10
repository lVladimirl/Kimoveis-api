import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const categoriesCreateService = async ({
  name,
}: ICategoryRequest) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categoryAlredyExists = await categoriesRepository.findOne({
    where: { name },
  });

  if (categoryAlredyExists) {
    throw new AppError(409, "Category Alredy Registered");
  }

  const category = new Categories();
  category.name = name;

  categoriesRepository.create(category);
  await categoriesRepository.save(category);
  return category;
};

export default categoriesCreateService;
