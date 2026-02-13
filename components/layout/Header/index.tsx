import React from 'react';

import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

export type HeaderProps = {};

const Header = ({}: HeaderProps): React.ReactElement => {
    return (
        <nav className="nav">
            <Container className="flex justify-between">
                <div>LOGO</div>

                <div className="nav__links">
                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>

                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>

                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>

                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>

                    <Button
                        as="anchor"
                        className="nav__link"
                        href="#">
                        Collection
                    </Button>
                </div>
            </Container>
        </nav>
    );
};

export default Header;
