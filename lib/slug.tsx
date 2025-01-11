import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";

export const formatSlug = (slug: string | null) => {
  if (!slug) return "";
  return slug
    .split("-") //split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) //capitalize each word first letter
    .join(" "); //Join the words with a space
};

export const inverseFormatSlug = (title: string | null) => {
  if (!title) return "";
  return title
    .split(" ") //split the string by space
    .map((word) => word.charAt(0).toLowerCase() + word.slice(1)) //lower each word first letter
    .join("-"); //Join the words with a hyphens
};

export const copySlug = async (slug: string | null) => {
  if (!slug) return;
  
  await Clipboard.setStringAsync(formatSlug(slug));
  //mohamed-ramees -> Mohamed Ramees

  Toast.show("Copied Call ID to Clipboard", {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
  });
};
