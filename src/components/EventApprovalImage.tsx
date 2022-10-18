import { Box, Checkbox, ImageListItem } from "@mui/material";

export default function EventEditorImage({
  image,
  selectedItems,
  setSelectedItems,
}: {
  image: {
    file: string;
    event: string;
    caption: string;
  };
  selectedItems: Record<string, boolean>;
  setSelectedItems: (n: Record<string, boolean>) => void;
}) {
  return (
    <ImageListItem
      key={image.file}
      sx={{ cursor: "pointer" }}
      onClick={() => {
        setSelectedItems({ ...selectedItems, [image.file]: !selectedItems[image.file] });
      }}
    >
      <img
        src={`https://dutchforkrunners.com/Gallery/${image.file}`}
        alt={image.caption}
        style={{ height: "min(40vh, 20rem)", objectFit: "contain" }}
      />
      <Box
        bottom={0}
        left={0}
        right={0}
        position="absolute"
        padding={1}
        sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <p style={{ margin: 0 }}>{image.event}</p>
          <p style={{ fontSize: "75%", margin: "0" }}>{image.caption}</p>
        </Box>

        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Checkbox
            color="default"
            checked={!!selectedItems[image.file]}
            onChange={(e) => setSelectedItems({ ...selectedItems, [image.file]: e.target.checked })}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
      </Box>
    </ImageListItem>
  );
}
