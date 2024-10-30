import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useGetCategoriesQuery } from './apiSlice'; // Assuming the API slice for fetching categories
import { ListCategory } from './types'; // Assuming you have a type for ListCategory based on Prisma model
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormInputs {
  [key: string]: string; // Dynamic keys for handling recursive category selection
}

interface RecursiveCategorySelectorProps {
  categories: ListCategory[];
  depth: number;
  name: string;
  control: any;
  errors: any;
  register: any;
  parentId?: string | null;
}

const RecursiveCategorySelector: React.FC<RecursiveCategorySelectorProps> = ({
  categories, depth, name, control, errors, register, parentId = null
}) => {
  const filteredCategories = categories.filter(cat => cat.parentId === parentId);

  // If there are no categories to show at this level, return null
  if (filteredCategories.length === 0) {
    return null;
  }

  return (
    <div className="mb-3">
      <label htmlFor={`${name}_${depth}`} className="form-label">
        {depth === 0 ? 'Category' : 'Subcategory'}
      </label>
      <Controller
        name={`${name}_${depth}`}
        control={control}
        rules={{ required: `Please select a ${depth === 0 ? 'category' : 'subcategory'}` }}
        render={({ field }) => (
          <select
            id={`${name}_${depth}`}
            className={`form-select ${errors[`${name}_${depth}`] ? 'is-invalid' : ''}`}
            {...field}
          >
            <option value="">Select a {depth === 0 ? 'category' : 'subcategory'}</option>
            {filteredCategories.map((category: ListCategory) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      />
      {errors[`${name}_${depth}`] && (
        <div className="invalid-feedback">
          {errors[`${name}_${depth}`].message}
        </div>
      )}

      {/* Recursively render the subcategories */}
      {field.value && (
        <RecursiveCategorySelector
          categories={categories}
          depth={depth + 1}
          name={name}
          control={control}
          errors={errors}
          register={register}
          parentId={field.value}
        />
      )}
    </div>
  );
};

const CategorySelector: React.FC = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { control, handleSubmit, formState: { errors }, register } = useForm<FormInputs>();

  // Handle form submission
  const onSubmit = (data: FormInputs) => {
    console.log('Selected Categories and Subcategories:', data);
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Select Categories and Subcategories</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {categories && (
          <RecursiveCategorySelector
            categories={categories}
            depth={0} // Start at the root level (depth 0)
            name="category" // Base name for dynamic keys
            control={control}
            errors={errors}
            register={register}
          />
        )}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CategorySelector;
