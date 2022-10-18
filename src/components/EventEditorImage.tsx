import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragIndicator as DragIndicatorIcon, Edit as EditIcon } from "@mui/icons-material";
import { Box, Checkbox, ImageListItem } from "@mui/material";
import type { Event, EventImage } from "../data/useData";

export default function EventEditorImage({
  event,
  setData,
  image,
  i,
  selectedItems,
  setSelectedItems,
}: {
  event: Event;
  setData: (n: Event) => void;
  image: EventImage;
  i: number;
  selectedItems: Record<string, boolean>;
  setSelectedItems: (n: Record<string, boolean>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.src,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : undefined,
  };

  return (
    <ImageListItem
      key={image.src}
      sx={{ cursor: "pointer" }}
      onClick={() => {
        setSelectedItems({ ...selectedItems, [image.src]: !selectedItems[image.src] });
      }}
      ref={setNodeRef}
      style={style}
    >
      <img
        src={image.src}
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
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <DragIndicatorIcon {...attributes} {...listeners} />
          <span>{image.caption}</span>
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <EditIcon
            onClick={() => {
              // eslint-disable-next-line no-alert
              const p = window.prompt("Please enter the new caption", image.caption);
              if (p !== null) {
                const newEvent = { ...event };
                newEvent.images[i].caption = p;
                setData(newEvent);
              }
            }}
          />
          <Checkbox
            color="default"
            checked={!!selectedItems[image.src]}
            onChange={(e) => setSelectedItems({ ...selectedItems, [image.src]: e.target.checked })}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
      </Box>
    </ImageListItem>
  );
}
