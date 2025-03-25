import { useState  , useEffect} from "react";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
} from "lucide-react";
// ✅ Theme Switch
const ThemeSwitch = () => {
    const [theme, setTheme] = useState(
      localStorage.getItem("theme") || "light"
    );
  
    useEffect(() => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }, [theme]);
  
    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    };
  
    return (
      <Button onClick={toggleTheme} variant={"ghost"}>
        {theme === "light" ? <Sun /> : <Moon />}
      </Button>
    );
  };

  export default ThemeSwitch