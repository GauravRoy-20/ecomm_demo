import React from 'react';
import styles from './CategoryCheckbox.module.css';
type CATEGORY_CHECKBOX_PROPS = {
  category: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
};

const CategoryCheckbox = (props: CATEGORY_CHECKBOX_PROPS) => {
  const { category, onChange, checked } = props;
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={category}
        name={category}
        value={category}
        checked={checked}
        onChange={(e) => onChange(e?.target?.checked)}
        className={styles.checkboxInput}
      />
      <label htmlFor={category} className={styles.checkboxLabel}>
        {category}
      </label>
    </div>
  );
};

export default CategoryCheckbox;
