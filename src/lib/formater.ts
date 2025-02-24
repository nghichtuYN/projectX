export const generatePlaceholderContent = (column: any) => {
  return {
    id: `${column.id}-placeholder-content`,
    column_id: column.id,
    name: "placeholder-content",
    FE_PlaceholderContent: true,
  };
};
