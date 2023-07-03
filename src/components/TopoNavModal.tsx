import React from 'react'
import { useState } from 'react'
import { Modal, Button, Icon, Tab, Label, Image } from 'semantic-ui-react'
import Svg from "./common/media/svg"

export default function NavigatorCard() {

  const style = {
    img: {
      maxHeight: "100vh",
      maxWidth: "100vw",
      objectFit: "scale-down",
    }
  }

  const [open, setOpen] = React.useState(false)
  const [count, setCount] = useState(1)

  const panes = [
    {
      menuItem: 'Topo',
      render: () => (
        <Tab.Pane>
          <div>
            <Button icon size='mini' onClick={() => setCount((count) => count - 1)}><Icon name="chevron left" /></Button>
            <Label>
              #7 - [6B+] - Heineken
            </Label>
            <Button icon size='mini' onClick={() => setCount((count) => count - 1)}><Icon name="chevron right" /></Button>

          </div>
          <div className="TopoNav-Fit-Within">
            <div className={"TopoNav-Svg-Zoom" + count}>
              <div>hallloooo</div>
              <Image style={style.img}>
                {/* <Svg
            thumb={false}
            style={{}}
            m={m}
            close={false}
            optProblemId={12224}
            showText={false}
            problemIdHovered={12224}
            setPoblemIdHovered={(id) => setProblemIdHovered(id)}
          /> */}
              </Image>
            </div>
          </div>
          <Button icon size='mini' onClick={() => setCount((count) => count - 1)}><Icon name="minus" /></Button>
          <Button icon size='mini' onClick={() => setCount((count) => count + 1)}><Icon name="plus" /></Button>

          <div>#7 - [6B+] - Heineken </div>


        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Map',
      render: () => (
        <Tab.Pane>
          {/* Content for Tab 2 */}
        </Tab.Pane>
      ),
    },
    // Add more tabs as needed
  ];


  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      closeIcon
      trigger={<Label>Topo Nav</Label>}
      style={{ width: '100%', height: '100%', top: 0, left: 0, margin: 0 }}
    >
      <Modal.Content>


        <Tab panes={panes} />


      </Modal.Content>
    </Modal>
  );
}