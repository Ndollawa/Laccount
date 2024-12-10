import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface FormInputs {
  [key: string]: string;
}

interface RecursiveCategorySelectorProps {
  categories: any[]; // ListCategory[];
  depth: number;
  name: string;
  control: any;
  errors: any;
  register: any;
  parentId?: string | null;
  isRequired: boolean;
}

const RecursiveCategorySelector: React.FC<RecursiveCategorySelectorProps> = ({
  categories,
  depth,
  name,
  control,
  errors,
  register,
  parentId = null,
  isRequired = true
}) => {
  const filteredCategories = categories?.filter((cat) => cat.parentId === parentId);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <>
    <div className="mb-3 col-md-6 col-sm-12">
      <label htmlFor={`${name}_${depth}`} className="form-label">
        {depth === 0 ? 'Category' : 'Subcategory'}
      </label>
      <Controller
        name={`${name}`}
        control={control}
        rules={{ required: isRequired && (depth === 0)? `Please select a ${depth === 0 ? 'category' : 'subcategory'}` : false}}
        render={({ field }) => (
          <select
            id={`${name}_${depth}`}
            className={`form-select form-control ${errors[`${name}_${depth}`] ? 'is-invalid' : ''}`}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              setSelectedValue(e.target.value); // Store selected value for recursion
            }}
          >
            <option value="">Select a {depth === 0 ? 'category' : 'subcategory'}</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      />  <p>
            You have selected <strong>{filteredCategories.find(cat => cat.id === selectedValue)?.name}</strong>. Would you like to refine the selection?
          </p>
      {errors[`${name}_${depth}`] && (
        <div className="invalid-feedback">
          {errors[`${name}_${depth}`].message}
        </div>
      )}

   
    </div>   {/* Recursively render subcategories but selection is optional */}
      {filteredCategories.length > 0 && selectedValue && (
         <RecursiveCategorySelector
            categories={categories}
            depth={depth + 1}
            name={name} // Keep the parent name
            control={control}
            errors={errors}
            register={register}
            parentId={selectedValue}
            isRequired ={isRequired}
          />
      )}
      </>
  );
};

export default React.memo(RecursiveCategorySelector);
