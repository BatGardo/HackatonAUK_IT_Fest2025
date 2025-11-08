import { type FC } from "react";
import logoSrc from "@/assets/hiremind.png"; // относительный импорт через алиас @

const Logo: FC = () => (
  <img src={logoSrc} alt="HireMind Logo" className="h-20 w-auto" />
);

export default Logo;