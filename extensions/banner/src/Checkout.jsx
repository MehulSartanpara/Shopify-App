import React from 'react';
import {
  Banner,
  Text,
  useSettings,
  reactExtension,
  Link,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const { 
    banner_title, 
    banner_description, 
    collapsible, 
    status, 
    description_size, 
    description_color, 
    description_emphasis,
    description_link_color
  } = useSettings();

  // Function to parse the description and render the link
  const renderDescriptionWithLink = () => {
    if (!banner_description) return null;

    // Split the description by '{{' and '}}'
    const parts = banner_description.split(/{{|}}/);

    let result = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      // If it's an even index, it's regular text
      if (i % 2 === 0) {
        result.push(part);
      } else {
        // If it's an odd index, it's a link
        const [label, url] = part.split('|');
        result.push(<Link appearance={description_link_color} key={i} to={url}>{label}</Link>);
      }
    }
    return result;
  };

  return (
    <Banner 
      status={ status ? status : 'info' } 
      title={ banner_title ? banner_title : '' } 
      collapsible={collapsible} 
    >
      <Text 
        appearance={ description_color ? description_color : 'base' } 
        size={ description_size ? description_size : 'base' } 
        emphasis={ description_emphasis ? description_emphasis : '' }
      >
        {renderDescriptionWithLink()}
      </Text>
    </Banner>
  );
}