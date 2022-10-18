import { Delete as DeleteIcon } from "@mui/icons-material";
import { Box, Button, Checkbox, ImageList, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import EventApprovalImage from "../components/EventApprovalImage";
import useData from "../data/useData";
import usePending from "../data/usePending";
import useSetData from "../data/useSetData";

export default function AdminApprovalView(props: { password: string }) {
  const data = useData();
  const setData = useSetData(props.password, () => ({}));
  const [pending, setPending] = usePending(props.password);

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  useEffect(() => setSelectedItems({}), [data, pending]);

  if (data === undefined || pending === undefined) {
    return <div>Loading</div>;
  }

  const allSelected = pending.every((image) => !!selectedItems[image.file]);
  const numSelected = Object.values(selectedItems).filter((a) => a).length;

  return (
    <>
      <Box
        height="6rem"
        paddingBottom="2rem"
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
              pending.forEach((image) => (newSelect[image.file] = true));
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

            setPending(pending.filter((image) => !selectedItems[image.file]));

            const newData = [...data];
            for (let i = 0; i < newData.length; i++) {
              // add to target
              if (newData[i].url === e.target.value) {
                newData[i].images = [
                  ...newData[i].images,
                  ...pending
                    .filter((image) => !!selectedItems[image.file])
                    .map((p) => ({
                      caption: p.caption,
                      src: `https://dutchforkrunners.com/Gallery/${p.file}`,
                    })),
                ];
              }
            }
            setData(newData);
            setSelectedItems({});
          }}
        >
          <MenuItem disabled value="">
            <em>Move images to...</em>
          </MenuItem>
          {data.map((e) => (
            <MenuItem value={e.url}>{e.title}</MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          sx={{ margin: 2 }}
          startIcon={<DeleteIcon />}
          disabled={numSelected === 0}
          onClick={() => {
            setPending(pending.filter((image) => !selectedItems[image.file]));

            setSelectedItems({});
          }}
        >
          Delete
        </Button>
      </Box>

      <ImageList cols={6} gap={10} sx={{ marginTop: "6rem" }}>
        {pending.map((image, i) => (
          <EventApprovalImage
            key={i}
            image={image}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ))}
      </ImageList>
      {pending.length === 0 ? <span>No images to approve!</span> : undefined}
    </>
  );
}
