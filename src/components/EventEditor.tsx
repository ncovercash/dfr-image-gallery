import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Box, Button, Checkbox, ImageList, ImageListItem, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import type { Event, EventImage } from "../data/useData";

// eslint-disable-next-line react/no-unused-prop-types
export default function EventEditor(props: {
  event: Event;
  eventList: Event[];
  setData: (n: Event) => void;
  setAllData: (n: Event[]) => void;
}) {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  useEffect(() => setSelectedItems({}), [props.event]);

  const allSelected = props.event.images.every((image) => !!selectedItems[image.src]);
  const numSelected = Object.values(selectedItems).filter((a) => a).length;

  return (
    <>
      <Box
        height="4rem"
        borderBottom="1px solid #333"
        display="flex"
        alignItems="center"
        position="absolute"
        zIndex={100}
        width="100%"
        style={{ backgroundColor: "#111" }}
      >
        <Checkbox
          color="default"
          checked={allSelected}
          onChange={() => {
            const newSelect: Record<string, boolean> = {};
            if (!allSelected) {
              props.event.images.forEach((image) => (newSelect[image.src] = true));
            }
            setSelectedItems(newSelect);
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <span style={{ minWidth: "12ch" }}>{numSelected} selected</span>

        <Select
          value=""
          label="Move to"
          displayEmpty
          disabled={numSelected === 0}
          onChange={(e) => {
            if (e.target.value === "") return;

            const newData = [...props.eventList];
            for (let i = 0; i < newData.length; i++) {
              // remove from current event
              if (newData[i].url === props.event.url) {
                newData[i].images = props.event.images.filter((image) => !selectedItems[image.src]);
              }
              // add to target
              if (newData[i].url === e.target.value) {
                newData[i].images = [
                  ...newData[i].images,
                  ...props.event.images.filter((image) => !!selectedItems[image.src]),
                ];
              }
            }
            props.setAllData(newData);
            setSelectedItems({});
          }}
        >
          <MenuItem disabled value="">
            <em>Move images to...</em>
          </MenuItem>
          {props.eventList
            .filter((e) => e.url !== props.event.url)
            .map((e) => (
              <MenuItem value={e.url}>{e.title}</MenuItem>
            ))}
        </Select>
        <Button
          variant="contained"
          sx={{ margin: 2 }}
          startIcon={<DeleteIcon />}
          disabled={numSelected === 0}
          onClick={() => {
            props.setData({
              ...props.event,
              images: props.event.images.filter((image) => !selectedItems[image.src]),
            });
            setSelectedItems({});
          }}
        >
          Delete
        </Button>
      </Box>
      <ImageList cols={6} gap={10} sx={{ marginTop: "4rem" }}>
        {props.event.images.map((image, i) => (
          <ImageListItem
            key={image.src}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedItems({ ...selectedItems, [image.src]: !selectedItems[image.src] });
            }}
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
              <span>{image.caption}</span>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <EditIcon
                  onClick={() => {
                    // eslint-disable-next-line no-alert
                    const p = window.prompt("Please enter the new caption", image.caption);
                    if (p !== null) {
                      const newEvent = { ...props.event };
                      newEvent.images[i].caption = p;
                      props.setData(newEvent);
                    }
                  }}
                />
                <Checkbox
                  color="default"
                  checked={!!selectedItems[image.src]}
                  onChange={(e) =>
                    setSelectedItems({ ...selectedItems, [image.src]: e.target.checked })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
