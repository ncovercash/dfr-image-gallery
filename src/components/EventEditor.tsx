import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Box, Button, Checkbox, ImageList, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import type { Event } from "../data/useData";
import EventEditorImage from "./EventEditorImage";

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => {
          const { active, over } = e;

          if (over !== null && active.id !== over.id) {
            const oldIndex = props.event.images.map((i) => i.src).indexOf(active.id as string);
            const newIndex = props.event.images.map((i) => i.src).indexOf(over.id as string);

            const newData = [...props.event.images];
            newData.splice(newIndex, 0, ...newData.splice(oldIndex, 1));

            props.setData({
              ...props.event,
              images: newData,
            });
          }
        }}
      >
        <SortableContext items={props.event.images.map((i) => i.src)}>
          <ImageList cols={6} gap={10} sx={{ marginTop: "4rem" }}>
            {props.event.images.map((image, i) => (
              <EventEditorImage
                key={i}
                image={image}
                i={i}
                event={props.event}
                setData={props.setData}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            ))}
          </ImageList>
        </SortableContext>
      </DndContext>
    </>
  );
}
