export const getTypeColorClasses = (type: string) => {
  const typeMap: Record<string, { bg: string; text: string }> = {
    fire: { bg: "bg-type-fire", text: "text-type-text-fire" },
    water: { bg: "bg-type-water", text: "text-type-text-water" },
    grass: { bg: "bg-type-grass", text: "text-type-text-grass" },
    electric: { bg: "bg-type-electric", text: "text-type-text-electric" },
    psychic: { bg: "bg-type-psychic", text: "text-type-text-psychic" },
    ice: { bg: "bg-type-ice", text: "text-type-text-ice" },
    dragon: { bg: "bg-type-dragon", text: "text-type-text-dragon" },
    dark: { bg: "bg-type-dark", text: "text-type-text-dark" },
    fairy: { bg: "bg-type-fairy", text: "text-type-text-fairy" },
    normal: { bg: "bg-type-normal", text: "text-type-text-normal" },
    fighting: { bg: "bg-type-fighting", text: "text-type-text-fighting" },
    poison: { bg: "bg-type-poison", text: "text-type-text-poison" },
    ground: { bg: "bg-type-ground", text: "text-type-text-ground" },
    rock: { bg: "bg-type-rock", text: "text-type-text-rock" },
    bug: { bg: "bg-type-bug", text: "text-type-text-bug" },
    ghost: { bg: "bg-type-ghost", text: "text-type-text-ghost" },
    steel: { bg: "bg-type-steel", text: "text-type-text-steel" },
    flying: { bg: "bg-type-flying", text: "text-type-text-flying" },
  };
  return typeMap[type] || { bg: "bg-muted", text: "text-muted-foreground" };
};
