# Rust solution attempts

## Setup

Each day is its own crate. Because a crate can not have a name starting with
the numeric character each day is spelt e.g. day 1 is `one`, day 20 is
`twenty`.

Make a copy of the `x` directory and rename it for the day e.g. from the `rust`
directory run `cp -r x one`, for day `one`. In the new directory update the
package name in `Cargo.toml` to match the name of the day.

### Running

[cargo-watch](https://crates.io/crates/cargo-watch) is used to help with
running the solutions. See the link for additional information on installing
and detailed usage.

Basic use is achieved with `cargo watch -x run` in the directory of the day
being worked on. Alternatively the following command can be run from the `rust`
directory and the day to run updated - `cargo watch -x run --workdir one`.
