import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { AntDesign as Icon } from "@expo/vector-icons"

const Stat = ({
  onMessage = (d) => console.log(d.imgs),
  editable = true,
  initDelta = exampleDelta,
}) => {
  const [modal, setModal] = useState(false);
  const [delta, setDelta] = useState(initDelta);
  const height = parseInt(Dimensions.get('window').height * 0.5).toString();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {editable ? (
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={() => {
            setModal(true);
          }}>
          <Icon
            name="edit"
            style={{
              fontWeight: 'bold',
              fontSize: 35,
              paddingHorizontal: 6,
            }}
          />
        </TouchableOpacity>
      ) : undefined}
      <WebView
        source={{
          html: viewHtmls[0] + viewHtmls[1] + delta + viewHtmls[2],
        }}
      />
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View
          style={{
            backgroundColor: 'black',
            opacity: 0.7,
            flex: 1,
            zIndex: -1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}></View>
        <SafeAreaView
          style={{
            flex: 1,
            marginVertical: 60,
            marginHorizontal: 20,
            borderRadius: 40,
          }}>
          <WebView
            style={{ borderRadius: 20 }}
            source={{
              html: editHtmls[0] + height + editHtmls[1] + delta + editHtmls[2],
            }}
            onMessage={(e) => {
              var delt = e.nativeEvent.data,
                n,
                imgs = [];
              var deltaParsed = JSON.parse(delt);
              for (n = 0; n < deltaParsed.ops.length; n++) {
                var img = deltaParsed.ops[n].insert.image;
                if (img) imgs.push({ path: img });
              }
              setDelta(delt);
              setModal(false);
              onMessage({ delt, imgs });
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const exampleDelta = JSON.stringify([
  { insert: 'Hello ' },
  { insert: 'World!', attributes: { bold: true } },
  { insert: '\n' },
]);

const editHtmls = [
  // ============ 0 ============
  `<meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link href="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css" rel="stylesheet">
    <script src="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js"></script>
    <div id="editor" style=" font-size: 18px; height: `,
  // ============ 1 ============
  `;"></div>
    <div id="toolbar">
        <!-- Add font size dropdown -->
        <select class="ql-size">
            <option value="small"></option>
            <!-- Note a missing, thus falsy value, is used to reset to default -->
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
        </select>
        <!-- Add a bold button -->
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
        <button class="ql-image"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
        <button class="ql-direction" value="rtl"></button>
        <select class="ql-color"></select>
        <select class="ql-background"></select>
        <select class="ql-font"></select>
        <select class="ql-align"></select>
        <button class="ql-clean"></button>
    
        <!-- But you can also add your own -->
        <button class="mdc-button mdc-button--raised foo-button" 
            style="background-color:#000000; color:#FFFFFF; left:120; top:6 "
        >
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">SALVA</span>
        </button>
    </div>
  
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script><script>
        var okButton = document.querySelector('.foo-button');
        mdc.ripple.MDCRipple.attachTo(okButton);
        okButton.addEventListener("click", function(){
            window.ReactNativeWebView.postMessage(JSON.stringify(quill.getContents()))
        })
        var quill = new Quill('#editor',{ 
            modules: { toolbar: '#toolbar' },
            theme: 'snow' 
        }); 
        quill.setContents(`,
  // ============ 2 ============
  `);
    </script>`,
];

const viewHtmls = [
  // ============ 0 ============
  `<meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link href="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css" rel="stylesheet">
    <script src="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js"></script>
    <div id="editor" style=" font-size: 18px; height: `,
  // ============ 1 ============
  `;"></div>
    <div id="toolbar" style="display:none"></div>
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script><script>
        var quill = new Quill('#editor',{ 
            modules: { toolbar: '#toolbar' },
            theme: 'snow' 
        }); 
        quill.setContents(`,
  // ============ 2 ============
  `); quill.disable(); 
    </script>`,
];

export default Stat;
