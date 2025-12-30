import { StyleSheet } from "react-native";

export const textColors = {
  primary: "#111827", // gray-900
  secondary: "#374151", // gray-700
  muted: "#64748B", // slate-500
  accent: "#9ca3af", // gray-400
  border: "#E5E7EB", // gray-200
};

const baseText = {
  fontSize: 16,
  lineHeight: 24,
};

export const markdownStyles = StyleSheet.create({
  /* ====== BASE TEXT ====== */
  body: {
    color: textColors.secondary,
    ...baseText,
  },

  paragraph: {
    marginTop: 24,
  },

  /* ====== HEADINGS ====== */
  heading1: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "700",
    letterSpacing: -1,
    color: textColors.primary,
  },

  heading2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    letterSpacing: -1,
    color: textColors.primary,
    marginTop: 24,
  },

  heading3: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    letterSpacing: -1,
    color: textColors.primary,
    marginTop: 24,
  },

  /* ====== TEXT EMPHASIS ====== */
  strong: {
    fontWeight: "500",
    color: textColors.primary,
  },

  em: {
    fontStyle: "italic",
    color: textColors.secondary,
  },

  /* ====== LISTS ====== */
  bullet_list: {},

  ordered_list: {},

  list_item: {
    flexDirection: "row",
    marginTop: 24,
  },

  bullet_list_icon: {
    color: textColors.accent,
    marginRight: 8,
  },

  list_item_text: {
    flex: 1,
    color: textColors.secondary,
    ...baseText,
  },

  /* ====== BLOCKQUOTE / NOTE ====== */
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: textColors.accent,
    paddingLeft: 12,
    marginTop: 24,
  },

  blockquote_text: {
    color: textColors.muted,
    ...baseText,
  },

  /* ====== LINKS ====== */
  link: {
    color: textColors.accent,
    textDecorationLine: "underline",
  },

  /* ====== HR ====== */
  hr: {
    backgroundColor: textColors.border,
    height: 1,
    marginTop: 24,
  },

  /* ====== TABLE ====== */
  table: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 24,
  },

  thead: {
    backgroundColor: "#f9fafb", // slate-50
  },

  th: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontWeight: "600",
    fontSize: 16,
    color: textColors.primary,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#fff",
  },

  td: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 13,
    color: textColors.secondary,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#fff",
  },
});
