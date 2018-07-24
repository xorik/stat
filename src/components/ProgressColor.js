export default function(value) {
  const RED = "#EE5F5B";
  const YELLOW = "#c6bf00";
  const ORANGE = "#f89406";
  const GREEN = "#62C462";

  const blend = (color1, color2, ratio) => {
    const hex = function(x) {
      x = x.toString(16);
      return x.length === 1 ? "0" + x : x;
    };

    const r = Math.ceil(
      parseInt(color1.substring(1, 3), 16) * ratio +
        parseInt(color2.substring(1, 3), 16) * (1 - ratio)
    );
    const g = Math.ceil(
      parseInt(color1.substring(3, 5), 16) * ratio +
        parseInt(color2.substring(3, 5), 16) * (1 - ratio)
    );
    const b = Math.ceil(
      parseInt(color1.substring(5, 7), 16) * ratio +
        parseInt(color2.substring(5, 7), 16) * (1 - ratio)
    );

    return `#${hex(r)}${hex(g)}${hex(b)}`;
  };

  if (value < 0.6) {
    return RED;
  }

  if (value >= 1) {
    return GREEN;
  }

  if (value < 0.8) {
    return blend(ORANGE, RED, (value - 0.6) / 0.2);
  }

  if (value < 0.9) {
    return blend(YELLOW, ORANGE, (value - 0.8) / 0.1);
  }

  return blend(GREEN, YELLOW, (value - 0.9) / 0.1);
}
