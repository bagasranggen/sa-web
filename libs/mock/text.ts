export const FULL_TEXT = `
    <p>HTML Heading Element</p>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, atque blanditiis
        ducimus est fugit incidunt ipsa ipsum libero, magni mollitia quia sed voluptatum! Aliquid
        dolores eius porro reprehenderit ut? Ratione.
    </p>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, atque blanditiis
        ducimus est fugit incidunt ipsa ipsum libero, magni mollitia quia sed voluptatum! Aliquid
        dolores eius porro reprehenderit ut? Ratione.
    </p>
    
    <p>HTML Formatting Element</p>
    <p>
        <strong>This is inside strong tag</strong>, consectetur adipisicing elit.
        <b>This is inside b tag</b> est fugit incidunt ipsa ipsum libero, magni mollitia quia sed
        voluptatum! Aliquid dolores eius porro reprehenderit ut? Ratione.
        <i>This is inside i tag</i>, consectetur adipisicing elit. Amet corporis,
        <em>This is inside em tag</em> perferendis porro quos totam velit. Accusamus accusantium 
        <b>before break tag</b>
        <br />
        <b>after break tag</b> amet dolorem ducimus facilis id itaque possimus provident quae vel!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi dicta et inventore 
        <b>before double break tag</b>
        <br />
        <br />
        <b>after double break tag</b> <sup>This is sup tag</sup> <sub>this is sub tag</sub> 
        <small>This is small tag</small>, repellat tempora, veniam voluptatem? Aut consequatur
        maiores nihil provident quaerat. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ab amet doloremque, doloribus enim et illum impedit itaque natus nihil nulla obcaecati odio
        officia porro quaerat quod repellat sed ut voluptas?
    </p>
    
    <p>
        <code>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur, earum
            ex in neque odit officia optio perferendis placeat qui quis ratione rem, repellendus
            repudiandae rerum sed sit unde voluptate.
        </code>
    </p>
    
    <ul>
        <li>unordered list 1</li>
        <li>unordered list 2</li>
        <li>unordered list 3</li>
        <li>unordered list 4</li>
        <li>nested unordered
            <ul>
                <li>nested unordered list 1</li>
                <li>nested unordered list 2</li>
                <li>nested unordered list 3</li>
                <li>nested unordered list 4</li>
            </ul>
        </li>
        <li>nested ordered
            <ol>
                <li>nested ordered list 1</li>
                <li>nested ordered list 2</li>
                <li>nested ordered list 3</li>
                <li>nested ordered list 4</li>
            </ol>
        </li>
    </ul>
    
    <ol>
        <li>ordered list 1</li>
        <li>ordered list 2</li>
        <li>ordered list 3</li>
        <li>ordered list 4</li>
        <li>nested unordered
            <ul>
                <li>nested unordered list 1</li>
                <li>nested unordered list 2</li>
                <li>nested unordered list 3</li>
                <li>nested unordered list 4</li>
            </ul>
        </li>
        <li>nested ordered
            <ol>
                <li>nested ordered list 1</li>
                <li>nested ordered list 2</li>
                <li>nested ordered list 3</li>
                <li>nested ordered list 4</li>
            </ol>
        </li>
    </ol>
`;

export const TEXT_2_PARAGRAPH = `
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a lacinia nulla. In sit amet
        mollis risus, in varius arcu. Nunc tincidunt malesuada ornare. Fusce pulvinar, erat ac
        dignissim mattis, enim urna facilisis magna, at finibus mauris lacus id leo. Nullam eu
        cursus magna, at dapibus mi. Vivamus et viverra ex. Morbi at dolor diam. In hendrerit elit
        in fermentum maximus. Aliquam viverra egestas elit, eu laoreet erat consectetur mollis.
    </p>
    <p>
        Etiam interdum pharetra metus quis consectetur. In faucibus odio vel orci interdum sagittis.
        Quisque pretium metus sit amet neque dapibus, maximus iaculis mi commodo. Donec vel
        facilisis magna. Pellentesque non erat sollicitudin, laoreet nulla eu, semper turpis. Etiam
        pretium eros sed quam iaculis iaculis. Donec pellentesque egestas nisi. Etiam aliquet ligula
        sed pharetra efficitur. Aenean sed rhoncus arcu. Praesent semper faucibus nibh, at commodo
        mi facilisis eget. Aliquam ut ipsum quis sapien aliquam consectetur sit amet pulvinar massa.
        Duis sagittis nisi ut faucibus dapibus. Sed nec bibendum magna.
    </p>
`;

export const TEXT_SHORT = `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem cumque error eum eveniet labore laudantium maiores nesciunt quas ratione.</p>`;

export const RICH_TEXT_FULL: any = {
    root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
            {
                tag: 'h1',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Heading 1',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                tag: 'h2',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Heading 2',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                tag: 'h3',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Heading 3',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                tag: 'h4',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Heading 4',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                tag: 'h5',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Heading 5',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                tag: 'h6',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Heading 6',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                tag: 'h3',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'This Is Free Text',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                type: 'paragraph',
                format: 'justify',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'This is inside strong tag',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                    },
                    {
                        mode: 'normal',
                        text: '. Etiam semper ligula sed imperdiet lobortis. Duis non odio sit amet ante consequat aliquet. Ut laoreet nisl mauris, ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                    {
                        mode: 'normal',
                        text: 'This is inside i tag',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 2,
                        version: 1,
                    },
                    {
                        mode: 'normal',
                        text: '. Vestibulum cursus diam non nunc vehicula, ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                    {
                        mode: 'normal',
                        text: 'This is inside underline tag.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 8,
                        version: 1,
                    },
                    {
                        mode: 'normal',
                        text: ' Mauris sit amet augue luctus, ullamcorper magna sed, pharetra mauris. Pellentesque non nunc leo. Maecenas non ex et nisi sagittis fringilla sed sed nunc. In ac quam in arcu pretium dictum sit amet nec velit. ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                    {
                        mode: 'normal',
                        text: 'This is inside strikethrough tag',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 4,
                        version: 1,
                    },
                    {
                        mode: 'normal',
                        text: '.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
                textStyle: '',
                textFormat: 1,
            },
            {
                type: 'paragraph',
                format: 'justify',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                type: 'paragraph',
                format: 'justify',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'This is sup tag',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 64,
                        version: 1,
                    },
                ],
                direction: null,
                textStyle: '',
                textFormat: 64,
            },
            {
                type: 'paragraph',
                format: 'justify',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'this is sub tag',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 32,
                        version: 1,
                    },
                ],
                direction: null,
                textStyle: '',
                textFormat: 32,
            },
            {
                type: 'paragraph',
                format: 'justify',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                type: 'paragraph',
                format: 'justify',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Nulla aliquet nisi faucibus, faucibus odio ac, vulputate massa. Maecenas varius nec est nec cursus. Nam ut pulvinar elit. Fusce sollicitudin lacus quis viverra dignissim. Donec tincidunt leo quis imperdiet convallis. Nam pharetra nisl ut ullamcorper lobortis. Pellentesque condimentum facilisis dolor, at aliquam ex suscipit vel. Nam et elementum elit. Curabitur volutpat aliquet elit sed commodo. Phasellus rutrum faucibus tortor in sodales.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                type: 'paragraph',
                format: 'justify',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Nulla aliquet nisi faucibus, faucibus odio ac, vulputate massa. Maecenas varius nec est nec cursus. Nam ut pulvinar elit. Fusce sollicitudin lacus quis viverra dignissim. Donec tincidunt leo quis imperdiet convallis. Nam pharetra nisl ut ullamcorper lobortis. ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 16,
                        version: 1,
                    },
                ],
                direction: null,
                textStyle: '',
                textFormat: 16,
            },
            {
                type: 'paragraph',
                format: 'justify',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                tag: 'h3',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'This Is Horizontal Rule',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                type: 'horizontalrule',
                version: 1,
            },
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                tag: 'h3',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'This Is Block Quote',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                type: 'quote',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper ligula sed imperdiet lobortis. Duis non odio sit amet ante consequat aliquet.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                tag: 'h3',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'This Is Ordered List',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                tag: 'ol',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        type: 'listitem',
                        value: 1,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Ordered List 1',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 2,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Ordered List 2',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 3,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Ordered List 3',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 4,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                tag: 'ol',
                                type: 'list',
                                start: 1,
                                format: '',
                                indent: 0,
                                version: 1,
                                children: [
                                    {
                                        type: 'listitem',
                                        value: 1,
                                        format: '',
                                        indent: 1,
                                        version: 1,
                                        children: [
                                            {
                                                mode: 'normal',
                                                text: 'Nested Ordered List 1',
                                                type: 'text',
                                                style: '',
                                                detail: 0,
                                                format: 0,
                                                version: 1,
                                            },
                                        ],
                                        direction: null,
                                    },
                                    {
                                        type: 'listitem',
                                        value: 2,
                                        format: '',
                                        indent: 1,
                                        version: 1,
                                        children: [
                                            {
                                                mode: 'normal',
                                                text: 'Nested Ordered List 2',
                                                type: 'text',
                                                style: '',
                                                detail: 0,
                                                format: 0,
                                                version: 1,
                                            },
                                        ],
                                        direction: null,
                                    },
                                    {
                                        type: 'listitem',
                                        value: 3,
                                        format: '',
                                        indent: 1,
                                        version: 1,
                                        children: [
                                            {
                                                mode: 'normal',
                                                text: 'Nested Ordered List 3',
                                                type: 'text',
                                                style: '',
                                                detail: 0,
                                                format: 0,
                                                version: 1,
                                            },
                                        ],
                                        direction: null,
                                    },
                                ],
                                listType: 'number',
                                direction: null,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 4,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Ordered List 4',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 5,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Ordered List 5',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 6,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Ordered List 6',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                ],
                listType: 'number',
                direction: null,
            },
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                tag: 'h3',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'This Is Ordered List',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        type: 'listitem',
                        value: 1,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Unordered List 1',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 2,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Unordered List 2',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 3,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Unordered List 3',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 4,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                tag: 'ul',
                                type: 'list',
                                start: 1,
                                format: '',
                                indent: 0,
                                version: 1,
                                children: [
                                    {
                                        type: 'listitem',
                                        value: 1,
                                        format: '',
                                        indent: 1,
                                        version: 1,
                                        children: [
                                            {
                                                mode: 'normal',
                                                text: 'Unordered List ',
                                                type: 'text',
                                                style: '',
                                                detail: 0,
                                                format: 0,
                                                version: 1,
                                            },
                                        ],
                                        direction: null,
                                    },
                                    {
                                        type: 'listitem',
                                        value: 2,
                                        format: '',
                                        indent: 1,
                                        version: 1,
                                        children: [
                                            {
                                                mode: 'normal',
                                                text: 'Unordered List ',
                                                type: 'text',
                                                style: '',
                                                detail: 0,
                                                format: 0,
                                                version: 1,
                                            },
                                        ],
                                        direction: null,
                                    },
                                    {
                                        type: 'listitem',
                                        value: 3,
                                        format: '',
                                        indent: 1,
                                        version: 1,
                                        children: [
                                            {
                                                mode: 'normal',
                                                text: 'Unordered List ',
                                                type: 'text',
                                                style: '',
                                                detail: 0,
                                                format: 0,
                                                version: 1,
                                            },
                                        ],
                                        direction: null,
                                    },
                                ],
                                listType: 'bullet',
                                direction: null,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 4,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Unordered List 4',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 5,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Unordered List 5',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 6,
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Unordered List 6',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                ],
                listType: 'bullet',
                direction: null,
            },
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
            {
                tag: 'h3',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'This Is Check List',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
            },
            {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        type: 'listitem',
                        value: 1,
                        format: '',
                        indent: 0,
                        checked: false,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Check list 1',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                    {
                        type: 'listitem',
                        value: 2,
                        format: '',
                        indent: 0,
                        checked: false,
                        version: 1,
                        children: [
                            {
                                mode: 'normal',
                                text: 'Check list 2',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                            },
                        ],
                        direction: null,
                    },
                ],
                listType: 'check',
                direction: null,
            },
        ],
        direction: null,
    },
};

export const RICH_TEXT_SHORT: any = {
    root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
            {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        mode: 'normal',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur corporis culpa eveniet, nobis perspiciatis rem!',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                    },
                ],
                direction: null,
                textStyle: '',
                textFormat: 0,
            },
        ],
        direction: null,
    },
};
